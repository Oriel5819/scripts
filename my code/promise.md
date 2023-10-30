# JAVASCRIPT PROMISE

## PROMISE

### Promise define function
```javascript
function promiseFunction(){
	return new Promise((resolve, reject) => {
		try{
			// do some shit
			resolve() // resolve if success 
		}catch(()=>{
			// reject if failed
			reject()
		})
	})
}
```

### Promise all
```javascript
	 const promise1 = Promise.resolve('Result 1');
	const promise2 = Promise.resolve('Result 2');
	const promise3 = Promise.resolve('Result 3');

	Promise.all([promise1, promise2, promise3])
	  .then((results) => {
	    console.log(results); // ['Result 1', 'Result 2', 'Result 3']
	  })
	  .catch((error) => {
	    console.error(error);
	  });
```

### Promise race
```javascript
function performTask() {
  return new Promise((resolve, reject) => {
    // Do some asynchronous task
    setTimeout(() => {
      resolve('Task completed');
    }, 5000);
  });
}

function abortableTask(timeout) {
  const taskPromise = performTask();
  
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Task timed out'));
    }, timeout);
  });
  
  return Promise.race([taskPromise, timeoutPromise]);
}

abortableTask(3000)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

