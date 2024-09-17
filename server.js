// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the socket.io client script from the 'client-dist' directory
app.use('/socket.io', express.static('node_modules/socket.io/client-dist'));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit a welcome message to the newly connected client
    socket.emit('chat-message', 'Hello, World');

    // Listen for chat messages from clients
    socket.on('chat-message', (msg) => {
        // Broadcast received message to all connected clients
        io.emit('chat-message', msg);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
