const express = require('express');
const http = require('http');
const { setupSocket } = require('./socketManager');
const app = express();
const server = http.createServer(app);
setupSocket(server);
app.get('/', (req, res) => res.send('OK'));
server.listen(3000, () => console.log('Backend listening on 3000'));