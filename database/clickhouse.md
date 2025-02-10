# CLICKHOUSE

## DESCRIPTION
**All id need to be set manualy**

## COMMAND

### Open client
`clickhouse-client`

### Auth
`clickhouse-client -u alfred --password`

### List databases
`SHOW databases`

### Use database
`USE database`

### List tables
`SHOW tables`

### CREATE DATABASE
`
// use Atomic if you want to use CREATE OR REPLACE TABLE
`
```sql
CREATE DATABASE db_comment ENGINE = Atomic COMMENT 'The temporary database';
SELECT name, comment FROM system.databases WHERE name = 'db_comment';
```

### ALTER TABLE
`
ALTER TABLE logs.pmr_repport RENAME COLUMN command TO ip;
`

### SELECT
```sql
SELECT * FROM logs.pmr_log WHERE codesite = 'LAMO002'ORDER BY createdAt DESC LIMIT 10 FORMAT JSON;
```

### CREATING TABLE

#### I
```sql
CREATE OR REPLACE TABLE pmr_repport
(
    id UInt32,
    batch UInt8,
    codesite String,
    command String,
    launchAt DateTime,
    resultAt DateTime,
    resultDuration Float32,
    resultStatus Boolean,
    formatOutputFrom DateTime,
    formatOutputTo DateTime,
    formatOutputDuration Float32,
    formatOutputStatus Boolean,
    formatQueryFrom DateTime,
    formatQueryTo DateTime,
    formatQueryDuration Float32,
    saveFrom DateTime,
    saveTo DateTime,
    saveDuration Float32,
    saveStatus Boolean,
    createdAt DateTime
)
ENGINE = MergeTree
ORDER BY id;
````
#### II
```sql
CREATE OR REPLACE TABLE test
(
    id UInt64,
    updated_at DateTime DEFAULT now(),
    updated_at_date Date DEFAULT toDate(updated_at)
)
ENGINE = MergeTree
ORDER BY id;

CREATE OR REPLACE TABLE executor_log
(
    id UInt32,
    app String,
    status String,
    perfomed_at DateTime,
    created_at DateTime DEFAULT now(),
    updated_at Date DEFAULT toDate(created_at)
)
ENGINE = MergeTree
ORDER BY created_at;

INSERT INTO test (id) Values (1);

SELECT * FROM test;
┌─id─┬──────────updated_at─┬─updated_at_date─┐
│  1 │ 2023-02-24 17:06:46 │      2023-02-24 │
└────┴─────────────────────┴─────────────────┘
```

### ALTER TABLE COLUMN
`
ALTER TABLE test MODIFY COLUMN col_name Nullable(UInt64)

ALTER TABLE table1 RENAME COLUMN old_name TO new_name
`

### TRUNCATE TABLE
`
TRUNCATE TABLE pmr_repport;
`

### ADD COLUMN
```sql
ALTER TABLE alter_test ADD COLUMN Added1 UInt32 FIRST;
ALTER TABLE alter_test ADD COLUMN Added2 UInt32 AFTER NestedColumn;
ALTER TABLE alter_test ADD COLUMN Added3 UInt32 AFTER ToDrop;
DESC alter_test FORMAT TSV;
```

### DROP
`
DROP DATABASE <database_name> NO DELAY

DROP TABLE <table_name> NO DELAY
`

### CLICKHOUSE CLIENT

```

const { ClickHouse } = require('clickhouse');
const { createClient } = require('@clickhouse/client');

const { CLICKHOUSE_DB, CLICKHOUSE_DB2 } = require('../configs');

const clickhouse = new ClickHouse(CLICKHOUSE_DB);
const clickhouse2 = createClient(CLICKHOUSE_DB2);

const _ = require('lodash');

module.exports = {
    getData: async (startDate, endDate) => {
        console.log('- Get data')
        try {
            const query = `WITH ordered_data AS (
                           SELECT
                               *,
                               row_number() OVER (PARTITION BY codesite, pmrType ORDER BY pmrDatetime) AS row_num
                           FROM
                               v_pmr
                           WHERE
                               pmrDatetime > '${startDate}' AND pmrDatetime < '${endDate}'
                       ),
                       listed_data AS (SELECT
                           tab1.*,
                           tab2.*
                       FROM
                           ordered_data AS tab1
                       LEFT JOIN
                           ordered_data AS tab2
                           ON tab1.codesite = tab2.codesite
                           AND tab1.pmrType = tab2.pmrType
                           AND tab1.row_num = tab2.row_num + 1
                       ORDER BY
                           tab1.codesite, tab1.pmrType, tab1.pmrDatetime)
                       SELECT DISTINCT codesite, Voltage_V AS Current_Voltage_V_Value, pmrDatetime AS Current_Datetime, tab2.Voltage_V AS Previous_Voltage_V_Value, tab2.pmrDatetime AS Previous_Datetime 
                       FROM listed_data 
                       WHERE Voltage_V IS NOT NULL AND tab2.Voltage_V IS NOT NULL AND Voltage_V != 0 AND tab2.Voltage_V != 0 FORMAT JSON`
            return await clickhouse.query(query).toPromise();
        }
        catch (error) {
            console.error(error)
            return ""
        }
    },

    getDataInCsv: async (startDate, endDate) => {

        console.log('- Get data in csv');

        let arrayCsvData = [];

        try {
            const output = await clickhouse2.query({
                query: `WITH ordered_data AS (
                           SELECT
                               *,
                               row_number() OVER (PARTITION BY codesite, pmrType ORDER BY pmrDatetime) AS row_num
                           FROM
                               v_pmr
                           WHERE
                               pmrDatetime >= {startDate: String} AND pmrDatetime <= {endDate: String}
                       ),
                       listed_data AS (SELECT
                           tab1.*,
                           tab2.*
                       FROM
                           ordered_data AS tab1
                       LEFT JOIN
                           ordered_data AS tab2
                           ON tab1.codesite = tab2.codesite
                           AND tab1.pmrType = tab2.pmrType
			AND tab1.row_num = tab2.row_num + 1
                       ORDER BY
                           tab1.codesite, tab1.pmrType, tab1.pmrDatetime)
                       SELECT DISTINCT codesite, pmrType, Voltage_V AS Current_Voltage_V_Value, pmrDatetime AS Current_Datetime, tab2.Voltage_V AS Previous_Voltage_V_Value, tab2.pmrDatetime AS Previous_Datetime 
                       FROM listed_data 
                       WHERE Voltage_V IS NOT NULL AND tab2.Voltage_V IS NOT NULL AND Voltage_V != 0 AND tab2.Voltage_V != 0`,
                format: 'CSVWithNames',
                query_params: {
                    startDate,
                    endDate
                },
            });

            const stream = output.stream();

            stream.on('data', (rows) => {

                arrayCsvData = arrayCsvData.concat(rows.map((row) => row.text));

            });

            return await new Promise((resolve, reject) => {

                stream.on('end', () => {

                    const chunked = _.chunk(arrayCsvData, 1000000);

                    resolve(chunked);

                });

                stream.on('error', reject);

            }).catch(() => reject(error));

        } catch (error) {
            console.log(error);
        }

    },
}

```
