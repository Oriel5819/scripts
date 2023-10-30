# RABBITMQ QUEUING

## FUNCTIONS

### Publisher
```javascript
// THIS CODE IS FROM 10.200.200.196:/opt/pmr

const _ = require('lodash');
function (data, divider, queueName) {
	return new Promise(async (resolve, reject) => {
		try {

			const splitData = _.chunk(data, divider); // if we need lodash
			const instanceConnMQ = await amqplib.connect('amqp://alfred:4lfr3dP455@10.210.210.54:5672');

			console.log(splitData.length);
			const chanel = await instanceConnMQ.createChannel();
			await chanel.assertQueue(queueName, { durable: false });

			for (let index = 0; index < splitData.length; index++) {
				const pmrTraffic = splitData[index];
				const msg = JSON.stringify(pmrTraffic);
				chanel.sendToQueue(queueName, Buffer.from(msg), {});
				console.log('sendedToRabbit', index);
			}
			chanel.close()
			resolve();
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
}
```

### Consumer
```javascript
// THIS CODE IS FROM 10.200.200.196:/opt/pmr
function (queueName) {
	try {
		const connection = await amqplib.connect('amqp://alfred:4lfr3dP455@10.210.210.54:5672');
		const chanel = await connection.createChannel();
		console.log(`- connected and ready to consume ${queueName}...`)
		await chanel.assertQueue(queueName, { durable: false });

		chanel.prefetch(1); // GET NEW ONE AFTER CONSUMING ONE

		chanel.consume(queueName, (msg) => {
			const pmrTraffic = JSON.parse(msg.content.toString())

			PMR.lauchCommand(pmrTraffic)
				.then(() => {
					chanel.ack(msg)
				})
				.catch(e => {
					console.log('######################')
					console.error(e)
					chanel.nack(msg)
				})
		})
	}
	catch (error) {
		console.error(error)
	}
}
```
