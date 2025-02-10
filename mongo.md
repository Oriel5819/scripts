# MONGO DB

## Step for install mongodb on ubuntu

1. apt-get update
2. apt-get install gnupg
3. wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
4. go to /etc/apt/sources.list.d and create a file named "mongodb-org-5.0.list
5. update
6. apt-get install -y mongodb-org
7. start by "systemctl start mongod"
8. check the command "mongo" whether it works or not.

## Step for unistalling mongo on ubuntu

1. check if mongod service is still working, if so, stop it.
2. purge everything in mongodb-org by using the command "apt-get purge mongodb-org*"
3. remove all log and libraries: "rm -r /var/log/mongodb" and "rm -r /var/lib/mongodb"

## Set authentication to mongo
1. connet to mongo
2. use admin
3. db.createUser({user: "Admin", pwd: "myNewPassword", roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]}) 
or db.createUser({user:"superAdmin", pwd: "super-admin", roles:[{"userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"}]})
https://stackoverflow.com/questions/22638258/create-superuser-in-mongo

4. logout from mongo
5. relog in using "mongo -u username -p"

## Allow other iP to connect to my host
1. open /etc/mongod.conf 
2. change bindIp value to 0.0.0.0

## Log in a compass
mongodb://192.168.2.187:27017

## documentation
docs.mongodb.com

## Connect to mongo console
mongosh [localhost:27017]

## Commands
```
// show databases
show dbs

// use db
use <database_name>

// clear console
cls

// show data
db.users.find()
db.users.find().limit(nbr)
db.users.find().sort({name:-1}) // -1 means desc
db.users.find().skip(nbr)
db.users.find({name: "value"}, {name: 1, age: 1, _id: 0}) // select name and age and skip _id

db.users.find({name: $neq: "value"})
db.users.find({age: {$gte: 18}})
db.users.find({age: {$not: {$gte: 18}}})
db.users.find({age: {$gte: 18, lte: 20}})
db.users.find({$and: [{age: 18}, {name: "value"}]})
db.users.find({$or: [{age: {$gte: 18}}, {name: "value"}]})
db.users.find({name: {$in :["value1", "value2"]})
db.users.find({age: {$exists: true}}) // return all data which has age

// find with expression
db.users.find({$expr: {$gte: ["property1", "property2"]}}) return if property1 >= property2

// find with nested object as property
db.users.find({"address.street": "125 street of ape"})

db.users.find({name: "values"})
db.users.findOne({name: "value"})

// get the document count
db.users.countDocument({age: {$gte: 18}})

// insert a data in database
db.users.insertOne({name:"exemple"})
db.users.insertMany([{name:"exemple"},{}])

// update 
db.users.updateOne({age: 26}, {$set: {age: 27}})
db.users.updateOne({_id: ObjectId("sdklskdskd"), {$inc: 2}}) // incremented by 2
db.users.updateOne({_id: ObjectId("sdklskdskd"), {$rename: { name:"NewName" }}})
db.users.updateOne({_id: ObjectId("sdklskdskd"), {$unset: { name:"" }}}) // by empty, removing
db.users.updateOne({_id: ObjectId("sdklskdskd"), {$push: { hobbies:"swimming" }}}) // pushing the value "swimming" in the property "hobbies" which needs to have a type of array
db.users.updateOne({_id: ObjectId("sdklskdskd"), {$pull: { hobbies:"swimming" }}}) // removing the value "swimming" in the property "hobbies" which needs to have a type of array

// replace 
replaceOne({age:30}, {name:"John"}) // replace the property age and its value by the property name and its value

// delete
deleteOne({name: "value"})
deleteMany({age: { $exists: false}})

// drop
db.<collection_name>.drop()

```

## ALFRED

### Clearing mongo
1. df -lh 
2. sudo systemctl mongod status
3. cd /var/log/mongodb/
4. ls -l
5. echo ""> mongod.log
 echo ""> mongod.log.1
 echo ""> mongod.log.2
 echo ""> mongod.log.3
6. sudo systemctl mongod restart
7. sudo systemctl mongod status


