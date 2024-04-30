# MYSQL

## Installing throught docker
```
docker run -d --name dev-mysql5 -p 3356:3306 -e MYSQL_USER=dev -e MYSQL_PASSWORD=mysql-dev -d mysql:5.7
```

## Accessing remotely to a remote mysql
```
mysql -u dev -h 192.168.2.196 -P 3386 -p 
```

## Adding host
1. switch to root
2. go to /etc
3. edit "hosts" with vim or nano
> ex: 184.156.15.456 hostname

## Queries
### Getting only duplicates
```
SELECT CodeSite, Name, base_band AS ip, ne_id, FrqBand FROM noc.rbs 
WHERE base_band IS NOT NULL 
AND CodeSite IN (SELECT CodeSite FROM noc.rbs GROUP BY CodeSite HAVING COUNT(base_band) > 0) ORDER BY CodeSite;
```

### Other examples
```javascript

try {
			var connection = mysql.createConnection(option);
			var selectQuery = `SELECT * FROM alarmes WHERE idNe = ${siteId} AND Date_Heure = '${Date_Heure}'`;

			connection.query(selectQuery, function (err, result, fields) {
				if (err) {
					if (cb)
						cb({ error: true, message: 'Error while finding idNe in alarmes', errorMessage: err });
					connection.end();
				}

				else switch (result.length > 0) {
					case true:
						{
							const updateQuery = mysql.format(`UPDATE alarmes SET ? WHERE ? AND ?`, [
								{ alarmDetails },
								{ idNe: siteId },
								{ Date_Heure }
							]);

							connection.query(updateQuery, function (err, res) {
								if (err) {
									console.error(err);
								}
								else {
									if (cb) {
										cb({ error: false, res, message: 'updated' });
									}
								}
								connection.end();
							});
						}
						break;

					case false:
						{
							const insertQuery = mysql.format(`INSERT INTO alarmes SET ?, ?, ?`, [
								{ alarmDetails },
								{ idNe: siteId },
								{ Date_Heure }
							]);

							connection.query(insertQuery, function (err, res) {
								if (err) {
									console.error(err);
								}
								else {
									if (cb) {
										cb({ error: false, res, message: 'inserted' });
									}
								}
								connection.end();
							});
						}
						break;

					default: console.log('IMPOSSIBLE CASE');
						break;
				}
			});
		} catch (error) {
			cb('error');
		}

```

## Insert and on Duplicate Update
```
INSERT INTO table (id,Col1,Col2) VALUES (1,1,1),(2,2,3),(3,9,3),(4,10,12)
ON DUPLICATE KEY UPDATE Col1=VALUES(Col1),Col2=VALUES(Col2);
```

### Getting rid of duplicates
```
```

### Getting specific
```
SELECT * FROM logs.pmr_log WHERE codesite = 'LANM108' AND pmrDatetime IN (SELECT MAX(pmrDatetime) FROM logs.pmr_log WHERE codesite = 'LANM108');
```

### Change timezone
```
SELECT CONVERT_TZ(updatedAt, '+00:00', '+03:00') as updatedAt FROM ericsson.sessions;
```

### Show all duplicates
```
SELECT id_check, COUNT(id_check) FROM ticket_node_checklist GROUP BY id_check HAVING COUNT(id_check) > 1;
```
### Delete all duplicates
```
DELETE t1 FROM ticket_node_checklist t1 INNER JOIN ticket_node_checklist t2 WHERE t1.id < t2.id AND t1.id_check = t2.id_check;
```

## Connecting to node
### Connection and operation
```javascript
const client = mysql.createConnection(MYSQL_DB)
client.query(`UPDATE noc.basse_tension_site ntb SET ? WHERE ntb.idNe = ? AND ntb.techno = ?`, [newStatus, idNe, techno], (e, result) => {
    client.end()

    if (e) {
        reject(e)
    }
    else {
        if (result.length > 0) {
            resolve(result[0])
        }
        else {
            resolve(null)
        }
    }
});

// or use this

var query = connection.query('SELECT * FROM posts');
query
  .on('error', function(err) {
    // Handle error, an 'end' event will be emitted after this as well
  })
  .on('fields', function(fields) {
    // the field packets for the rows to follow
  })
  .on('result', function(row) {
    // Pausing the connnection is useful if your processing involves I/O
    connection.pause();
 
    processRow(row, function() {
      connection.resume();
    });
  })
  .on('end', function() {
    // all rows have been received
  });
```


