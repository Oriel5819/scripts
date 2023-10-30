# MY JAVASCRIPT CODE

## to check all array content for and throw something when all are finish and not finding anything

```javascript:
for (let index = 0; index < users.length; index++) {
 if (users[index].id === id && users[index].token === token) {

 }
 else if (index === users.length - 1 && users[index].id != id || users[index].token != token) response.send({ success: false, error: true, status: "Votre token est expiré.", data: {} });
}
```

## uppercase all charAt 0 of all array elements

```javascript:
 function titlefy(title){
   return title.split("__").map( a => a.charAt(0).toUpperCase() + a.substr(1) ).join(' ');
}
```

## filter All object in array propriety and compare each of it with a given object

```javascript:
let object = {propriety1: value1, propriety2: value2, ...}

let foundRules = ARRAY_PARENT.filter(rule => {
	return Object.keys(object).every((key) => rule[key] === filter[key]);
	// every is used to check if all proprieties match the conditions
	// some is used to check if there is at least one of the proprieties match the conditions
});
```

## array 
```javascript:
for (const [key, value] of Object.entries(filter)) {
	console.log(`${key}: ${value}`);
}
```

## THIS IS USE TO UPDATE THE HISTORY ALARM RULES IN 178/alarme/base_bande_du_alarms

```javascript:
app.post('/updateHistoryAlarmRules', async function (req, res) {
	let { filter } = req.body;
	const classification = filter.Classification;
	let queries = [];

	delete filter.Classification;

	let foundRules = HISTORY_ALARM_CLASSIFICATION_RULES.filter(rule => {
		return Object.keys(filter).every((key) => rule[key] === filter[key]);
	});

	for (let foundRule of foundRules) {
		let query = 'UPDATE alarme.base_bande_du_alarms SET ';
		let = index = 0;
		for (const [key, value] of Object.entries(filter)) {
			index++;
			query += `${key} = '${value}'${(index === Object.entries(filter).length ? '' : ', ')}`;
		}
		query += ` WHERE Id = ${foundRule.Id}`;
		queries.push(query);
	}

	// UPDATE DATABASE
	for (let query of queries) {
		try {
			console.log('UPDATING BASEBAND ALARMS');
			var connection = mysql.createConnection(confDB.basebandAlarms);
			connection.query(query, function (err, data) {
				if (err) console.log('err', err)
				else console.log("updated");
			})
			connection.end()
		}
		catch (e) {
			console.log(e);
		}
	}
	res.send(queries);
});
```

## Change to snake_case
```javascript:
toSnakeCase: async function (anyCase: string) {
	const convertedCase = anyCase.replace(/[A-Z]/g, letter => `_${letter.toLocaleLowerCase()}`);
	console.log(convertedCase);
},
```

## Recursive 
```javascript:
function(){
test()}
test()
```

## Eachlimit
```javascript:
asynch.eachLimit(devices, 10, function (siteItem, callback) {
const command = `cd /opt/ericsson/moshell; ./moshell ${siteItem.Ip} pmr.mo|awk '$0~/Date|Object|FieldReplaceableUnit|Report/{print $0}'|grep -ve 'gzip'`;
// console.log(command)
exec(command, { maxBuffer: 1024 * 500 }, async function (err, output, code) {
    counter++;
    if (err) {
        console.log('[' + counter + ' / ' + devices.length + '] ', siteItem.CodeSite, ' ERROR!');
        callback();
    }
    else {
        await parsingOutput(devices, output, siteItem, counter);
        callback();
    }
    
    if(counter === devices.length) resolve();

})
}, () => {
resolve()
});
```

## Random color
```javascript
'#' + Math.floor(Math.random() * 16777215).toString(16)
```

## Lodash for sorting
```javascript
data = _.sortBy(data, function (o) { return o[0] }); // ASCENDENT SORTING
```

## Array concatination
```javascript
// suppose we have two arrays: array1 = [1,2,3] and array2 = [4,5,6]
// use this to conccatinate them
const newArray = [...array1, array2];

log(newArray) // should return [1,2,3,4,5,6]
```
