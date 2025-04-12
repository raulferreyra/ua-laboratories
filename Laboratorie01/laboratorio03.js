const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public/laboratorio03'));

io.on('connection', (socket) => {
    console.log('Usuario Conectado 🤩');
    socket.on('chat message', (msg) => {
        console.log('Mensaje recibido 🧨', msg);

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado 😣');
    });
});

http.listen(3000, () => {
    console.log('Servidor Activo en http://localhost:3000 🎮');
});