// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConnect=require("./config/dbConnect");

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();
const app = require('./app');

dbConnect();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//Socket Code

//var http = require("http").Server(app);
//var io = require("socket.io")(http);

const io = require("socket.io")(server, {
  cors : {
    //origin : ["http://localhost:8080", "https://admin.socket.io/"],
    origin : "*",
  }
})

const socketIo = io.of('/socket') 

socketIo.on('connection', socket=>{
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