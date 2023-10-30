# NODE SOCKET

## DESCRIPTION

## USAGE

### Socket Server
```javascript
// npm i socket-io
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    console.log(`Received message from client: ${data}`);
    socket.emit('message', 'Hello from server!');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
```

### Socket Client
```javascript
// npm i socket-io-client
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('message', 'Hello from client!');
});

socket.on('message', (data) => {
  console.log(`Received message from server: ${data}`);
  socket.disconnect();
});

socket.on('disconnect', () => {
  console.log('Connection closed');
});
```
