const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public/laboratorio04'));

const usuarios = {};

io.on('connection', (socket) => {
    console.log('Usuario Conectado 🤩');

    socket.on('nuevo usuario', (nick) => {
        usuarios[socket.id] = nick;
        console.log(`${nick} | Usuario conectado 🤩`);
        io.emit('usuarios conectados', Object.values(usuarios));
    });

    socket.on('chat message', (msg) => {
        console.log('Mensaje recibido 🧨', msg);

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado 😥');
        delete usuarios[socket.id];
        io.emit('usuarios conectados', Object.values(usuarios));
    });

    socket.on('nuevo usuario', (nick) => {
        usuarios[socket.id] = nick;

        io.emit('usuarios conectados', Object.values(usuarios));
        console.log(`${nick} | Usuario conectado 🤩`);
    });
});

http.listen(3000, () => {
    console.log('Servidor Activo en http://localhost:3000 🎮');
});