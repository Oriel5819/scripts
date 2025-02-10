# SSH EXEC

```javascript

// 10.200.200.20/opt/App/lib/ssh.js

const algorithm = 'aes-256-ctr';
const crypto = require('crypto');
const { Client } = require('ssh2');
const ENCRYPTION_KEY = 'NocAdmin123';

const SSH_READY_TIMEOUT = 60000;
const algorithms = {
    kex: [
        "diffie-hellman-group1-sha1",
        "ecdh-sha2-nistp256",
        "ecdh-sha2-nistp384",
        "ecdh-sha2-nistp521",
        "diffie-hellman-group-exchange-sha256",
        "diffie-hellman-group14-sha1"
    ],

    cipher: [
        "aes128-cbc",
        "3des-cbc",
        "blowfish-cbc",
        "aes128-ctr",
        "aes192-ctr",
        "aes256-ctr",
        "aes128-gcm",
        "aes128-gcm@openssh.com",
        "aes256-gcm",
        "aes256-gcm@openssh.com"
    ],

    serverHostKey: [
        "ssh-rsa",
        "ssh-dss",
        // "ssh-ed25519",//Unsupported algorithm
        "ecdsa-sha2-nistp256",
        "ecdsa-sha2-nistp384",
        "ecdsa-sha2-nistp521",
        "rsa-sha2-512",
        "rsa-sha2-256"
    ]
};

const LISTE_TABLE_SITE = {
    '2G': 'noc.rbs',
    '3G': 'noc.nodeB',
    '4G': 'noc.lte',
    '5G': 'noc.nr'
};

module.exports = _UTIL_ = {
    LISTE_TABLE_SITE,
    encrypt: (text) => {
        try {
            var cipher = crypto.createCipher(algorithm, ENCRYPTION_KEY);
            var crypted = cipher.update(text, 'utf8', 'hex');

            crypted += cipher.final('hex');

            return crypted;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    decrypt: (text) => {

        var decipher = crypto.createDecipher(algorithm, ENCRYPTION_KEY);
        var dec = decipher.update(text, 'hex', 'utf8');

        dec += decipher.final('utf8');

        return dec;
    },
    runSSH: ({ site }) => {
        const { Ip: host, siteUsername: username, sitePassword, sitePort: port, siteSShVersion } = site;
        return new Promise((resolve, reject) => {
            try {

                let credential = {
                    algorithms,
                    tryKeyboard: true,
                    host: host.trim(),
                    username,
                    password: module.exports.decrypt(sitePassword), // this is for test.js
                    // password: sitePassword, // this is for serviceQueuelte-test.js
                    readyTimeout: 60000,
                    port
                };

                const prompt = siteSShVersion === 'usual-shell' ? '>' : siteSShVersion === 'ose-shell' ? '$' : null;
                const cmd = siteSShVersion === 'usual-shell' ? 'show -r -m FmAlarm' : siteSShVersion === 'ose-shell' ? 'ncli' : null;
                const exitCmd = 'exit';

                const connection = new Client();

                connection
                    .on('ready', () => {

                        let outputSSH = '';

                        connection.shell((err, stream) => {

                            // console.time(`shell ${host}`);

                            if (err) {
                                console.error('Error opening shell:', err);
                                resolve({ error: true, outputSSH, siteSShVersion });
                                connection.end();
                            }

                            switch (siteSShVersion) {
                                case 'usual-shell':
                                    {
                                        let isCmdLaunched = false;

                                        stream.on('data', (data) => {

                                            if (data.indexOf('>') > -1) {

                                                if (!isCmdLaunched) {

                                                    isCmdLaunched = true;
                                                    stream.write('show -r -m FmAlarm\n');

                                                }

                                                else {

                                                    stream.write('exit\n');
                                                    connection.end();
                                                }
                                            }

                                            else outputSSH += data.toString();

                                        });
                                    }
                                    break;

                                case 'ose-shell':
                                    {
                                        let isCmdLaunched = false;

                                        stream.on('data', (data) => {

                                            if (data.indexOf('$') > -1) {

                                                stream.write('ncli\n');
                                            }

                                            if (data.indexOf('>') > -1) {

                                                if (!isCmdLaunched) {

                                                    isCmdLaunched = true;
                                                    stream.write('alarms\n');

                                                }

                                                else {

                                                    stream.write('exit\n');
                                                    connection.end();

                                                }

                                            }

                                            else outputSSH += data.toString();

                                        });

                                    }
                                    break;

                                default: {
                                    resolve({ error: true, outputSSH:'', siteSShVersion });
                                    connection.end();
                                }
                                    break;
                            }

                            stream.on('close', () => {
                                // console.log({ outputSSH, ip: site.Ip, shell: site.siteSShVersion });

                                resolve({ error: false, outputSSH, siteSShVersion });

                                // console.timeEnd(`shell ${host}`);
                                connection.end();
                            });
                        });



                        // CALLING SSH_EXEC
                        console.log({ credential, prompt, cmd, exitCmd });

                        resolve({ error: false, outputSSH, siteSShVersion });
                    })
                    .on('keyboard-interactive', (name, descr, lang, prompts, finish) => {
                        return finish([credential["password"]]);
                    })
                    .on('error', (error) => {
                        // console.error({ error, site: { host, username, password, port } });
                        resolve({ error: true, outputSSH: null, siteSShVersion });
                    })
                    .connect(credential);
            } catch (error) {
                console.error(error);
                resolve({ error: true, outputSSH: null, siteSShVersion });
            }
        });
    }
};
```
