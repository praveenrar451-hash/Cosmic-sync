const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected to the cosmos:', socket.id);

    // Handle messages
    socket.on('cosmic-message', (data) => {
        io.emit('cosmic-message', data);
    });

    // Handle drawing coordinates safely
    socket.on('draw-action', (data) => {
        socket.broadcast.emit('draw-action', data);
    });

    socket.on('clear-canvas', () => {
        io.emit('clear-canvas');
    });

    socket.on('disconnect', () => {
        console.log('A user left the cosmos:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Cosmic Sync server running on port ${PORT}`);
});
