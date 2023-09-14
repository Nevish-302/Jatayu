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
const Request = require('./models/requestModel')
const Organisation = require('./models/organisationModel'
)
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

  //create a socket listener for all organisation that when this is emitted , the requests will refresh on each organisation
  //or simply put, reinvoke the function of get requests that will be created
  socket.on('req-from-org', async (request, cb) =>{
    //socket.join(room)
    if(request.senderId && request.receiverId){
    const reqOrg = await Request.create(request)
    const sendOrg = await Organisation.findOneAndUpdate({_id : request.senderId}, {$push : {requests : request}})
    const receiveOrg = await Organisation.findOneAndUpdate({_id : request.receiverId}, {$push : {requests : request}})
    console.log(reqOrg)
    cb(
      {
        status: "success",
        data: {
            request : reqOrg,
        }
    })
  }
    else
    {
      cb({
        status: "failure",
        data: {
            message : "provide the teamid and organisation id",
        }
    })
    }
})
})