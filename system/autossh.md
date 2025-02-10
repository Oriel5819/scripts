# AUTOSSH

```
// In case your ssh_pub_key is not in the target server yet,
// use this line and follow the instruction

autossh -M 5902 -N -L *:15672:localhost:15672 alfred@10.210.210.54


// to test whether any given_port is available

telnet 10.210.210.14 22


// to copy your ssh_pub_key in target server

ssh-copy-id -i .ssh/id_rsa.pub alfred@10.210.210.54


// In case your ssh_pub_key is already in the target server,
// use this line with "-f"

autossh -M 5902 -N -f -L *:15672:localhost:15672 10.210.210.54
autossh -M 5912 -N -f -L *:27017:localhost:27017 10.210.210.68

// to kill the auto ssh

sudo killall autossh

// to list all autossh

netstat -tunalp | grep autossh

```

For test the connection

```
ssh -L *:2506:localhost:3306 alfred@10.200.200.23

```


```
# MYSQL
autossh -M 5810 -N -f -L *:3316:localhost:3306 alfred@alfred-db5 #10.210.210.34
autossh -M 5820 -N -f -L *:3326:localhost:3306 alfred@alfred-db #10.200.200.178

# MONGO
autossh -M 5910 -N -f -L *:27117:localhost:27017 alfred@alfred-mongo4 #10.210.210.14
autossh -M 5920 -N -f -L *:27217:localhost:27017 alfred@alfred-mongo #10.210.210.22
autossh -M 5930 -N -f -L *:27317:localhost:27017 alfred@alfred-mongo3 #10.210.210.68

# QUEUE
autossh -M 5710 -N -f -L *:15772:localhost:15672 alfred@alfred-queue #10.210.210.54

```







