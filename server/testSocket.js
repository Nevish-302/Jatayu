const express = require('express')

const PORT = 3000
const app = express()

const server = app.listen(3000, (err) => {
    if(err)
    {console.log(err)}
    else{
        console.log(`Connected successfully`)
    }
})

const io = require('socket.io')(server, {
    cors :{
        //origin : ["http://localhost:8080", "https://admin.socket.io/"],
        origin :"*",
    },
})
//User route
const UserIO = io.of('/user') 
UserIO.on('connection', socket=>
    {console.log(`connected to UserIo`)}
)
UserIO.use((socket, next) =>{
    if(socket.handshake.auth.token) {
        console.log(`Token is Here`)
        next()
    }
    else
    {
        next(new Error('Please Send Token'))
    }
})
//Main route
io.on('connection', socket=>{
    socket.on('ping', n =>console.log(n))
    socket.on('custom-event', (a, b, c) => {
        console.log(a, b, c);
    })
    socket.on('send-chat-message', (message, room) => {
        console.log(message, room);
        if(room == ''){socket.broadcast.emit('receive-message', message)}
        else{socket.to(room).emit('receive-message', message)};
        })
    console.log(socket.id);
    socket.on('join-room', (room, cb) =>{
        socket.join(room)
        cb(`Joined Room : ${room}`)
    })
})

