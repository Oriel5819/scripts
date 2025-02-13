# PM2

## SET A MAX MEMORY FOR AN APP

```
--node-args=\"--max-old-space-size=4096\"

example:

    "start": "pm2 start tickets_server.js --watch --time --log-date-format YYYY-MM-DD-HH:mm:ss --node-args=\"--max-old-space-size=4096\"",
```
