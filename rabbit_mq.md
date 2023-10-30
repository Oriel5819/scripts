# ALFRED RABBIT MQ

## INSTALLATION ON UBUNTU
Port: 15762
```javascript
su root
apt update
apt upgrade
apt install rabbit-server
rabbitmq-plugins enable rabbitmq_management // THIS COMMAND IS USED TO ENABLE THE LOGIN PLUGINS TO THE INSTALLED RABBIT MQ SERVER
rabbitmqctl add_user <username> <password> // TO SETTING A USER WITH ITS PASSWORD
rabbitmqctl set_user_tags <username> administrator // SETTING THE GIVEN USERNAME TO ADMINISTRATOR
rabbitmqctl set_permission -p / <username> ".*" ".*" ".*" // SETTING PERMISSION FOR USER <username> in vhost "/"
```

## CONNECT
### NODE
```javascript
// THIS CODE IS FROM ALFRED-TEST (10.210.210.16)/opt/data_traffic/trafficConsumer.js
// DEFAULT PORT IS 5672

// .env
const AMQ_USER = process.env.AMQ_USER || "alfred"
const AMQ_PASSWORD = process.env.AMQ_PASSWORD || "4lfr3dP455"
const AMQ_SERVER = process.env.AMQ_SERVER || "10.210.210.54"

// app.js
const amqplib = require('amqplib/callback_api'); // FOR CALLBACK
const amqplib = require('amqplib'); // FOR PROMISE

const conn = await connect(`amqp://${AMQ_USER}:${AMQ_PASSWORD}@${AMQ_SERVER}:5672`);
```
### WEB
```javascript
http://10.210.210.54:15672/
```

## Check information
```javascript
function getInfoQueue(queueName) {
   return new Promise((resolve, reject) => {
      try {
         const { AMQ_USER, AMQ_PASSWORD, AMQ_SERVER } = process.env;
         exec(`curl -u ${AMQ_USER}:${AMQ_PASSWORD} ${AMQ_SERVER}:15672/api/queues/%2f/${queueName}`, { maxBuffer: 2048 * 1024 }, async function (e, out, code) {
            if (e) {
               reject(e);
            }
            else {
               const { consumers, messages_ram, messages_ready, messages_unacknowledged_ram } = JSON.parse(out);
               resolve({ consumers, messages_ram, messages_ready, messages_unacknowledged_ram });
            }
         });
      } catch (error) {

         reject(error);
      }
   });
}
```

## PUBLISHER
```javascript
// THIS CODE IS FROM 10.200.200.177:/opt/bande_passante_international/bpi.js

const instanceConnMQ = await amqplib.connect(`amqp://alfred:4lfr3dP455@10.210.210.54:5672`);

function settingDataTrafficBatch(arrayDataTraffic) {
    const batchTraffics = _.chunk(arrayDataTraffic, 100);
    console.log({ total: arrayDataTraffic.length, batch: batchTraffics.length })

    for (let index = 0; index < batchTraffics.length; index++) {
        const batchTraffic = batchTraffics[index];
        postToQueue(batchTraffic, "batch-data_traffic")
    }
}

async function postToQueue(dataBatch, queueName) {
    const msg = JSON.stringify(dataBatch)

    // const conn = await connect(`amqp://${databases.AMQ_USER}:${databases.AMQ_PASSWORD}@${databases.AMQ_SERVER}:5672`);
    const ch = await instanceConnMQ.createChannel();
    await ch.assertQueue(queueName, { durable: false });

    ch.sendToQueue(queueName, Buffer.from(msg), {});

    ch.close()
}

```

## CONSUMMER
```javascript
// THIS CODE IS FROM ALFRED-TEST (10.210.210.16)/opt/data_traffic/trafficConsumer.js

async function consumer(queueName) {
    try {
        const conn = await connect(`amqp://${AMQ_USER}:${AMQ_PASSWORD}@${AMQ_SERVER}:5672`);
        const ch = await conn.createChannel();
        console.log(`- connected and ready to consume ${queueName}...`)
        await ch.assertQueue(queueName, { durable: false });

        ch.prefetch(1);

        ch.consume(queueName, (msg) => {
            const batchTraffic = JSON.parse(msg.content.toString())

            TRAFFIC.dataTrafficConsumer_v1(batchTraffic)
            .then(() => {
                ch.ack(msg)
            })
            .catch(e => {
		console.log('######################')
                console.error(e)
                ch.nack(msg)
            })
        })
    } 
    catch (error) {
        console.error(error)
    }
}
```
