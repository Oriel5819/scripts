# PORT

## CHECK WHETHER PORT RUNNING
`
sudo lsof -i | grep <port>
//or
lsof -i :<port>
`
## KILL A PORT
`
// get PID from lsof -i :port

kill -9 <PID>
`
