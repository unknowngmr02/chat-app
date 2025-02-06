const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // ✅ Require CORS
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // ✅ Allow all origins (change if needed)
    methods: ["GET", "POST"]
  }
});

// ✅ Apply CORS to Express as well
app.use(cors());

// ✅ Serve frontend files correctly
app.use(express.static(path.join(__dirname, 'public')));

const users = {}; // Store usernames

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('set username', (username) => {
    users[socket.id] = username;
    console.log(`${username} has joined.`);
  });

  socket.on('chat message', (msg) => {
    const username = users[socket.id] || 'Anonymous';
    console.log(`Message from ${username}: ${msg.text}`);
    io.emit('chat message', { username, text: msg.text });
  });

  socket.on('disconnect', () => {
    console.log(`${users[socket.id]} disconnected.`);
    delete users[socket.id];
  });
});

// ✅ Use Render’s assigned PORT
const PORT = process.env.PORT || 10000;

// ✅ Bind server to `0.0.0.0` instead of `localhost`
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
