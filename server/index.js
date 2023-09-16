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
const Team = require('./models/team.model')
const TypeObj = require('mongoose').Types.ObjectId
const Organisation = require('./models/organisationModel'
)
const io = require("socket.io")(server, {
  cors : {
    //origin : ["http://localhost:8080", "https://admin.socket.io/"],
    origin : "*",
  }
})
module.exports=io

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
  //request why and new funcs accordingly
  socket.on('req-from-org', async (request, cb) =>{
    //socket.join(room)
    console.log(request, request.senderId);
    const senderId = request.senderId
    const receiverId = request.receiverId
    if(request.senderId && request.receiverId){
    const reqOrg = await Request.create(request)
    const sendOrg = await Organisation.findOneAndUpdate({_id : new TypeObj(senderId)}, {$push : {requests : reqOrg._id}})
    const receiveOrg = await Organisation.findOneAndUpdate({_id : new TypeObj(receiverId)}, {$push : {requests : reqOrg._id}})
    console.log(reqOrg, sendOrg)
    //if the current _id and broadcast _id is same, then re requet the requests 
    socket.broadcast.emit('receive-request', receiveOrg._id)
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

socket.on('req-from-emp', async (request, cb) =>{
  //socket.join(room)
  try {
  console.log(request, request.senderId);
  const senderId = request.senderId
  const receiverId = request.receiverId
  if(request.senderId && request.receiverId){
  const reqOrg = await Request.create(request)
  const sendOrg = await Team.findOneAndUpdate({_id : new TypeObj(senderId)}, {$push : {requests : reqOrg._id}})
  const receiveOrg = await Organisation.findOneAndUpdate({_id : new TypeObj(receiverId)}, {$push : {requests : reqOrg._id}})
  console.log(reqOrg, sendOrg, receiveOrg, Organisation)
  //if the current _id and broadcast _id is same, then re requet the requests 
  socket.broadcast.emit('receive-request', receiveOrg._id)
  console.log("Hello");
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
} catch(Err)
{
  console.log(Err)
}
}
)

socket.on('req-to-emp', async (request, cb) =>{
  //socket.join(room)
  console.log(request, request.senderId);
  const senderId = request.senderId
  const receiverId = request.receiverId
  if(request.senderId && request.receiverId){
  const reqOrg = await Request.create(request)
  const receiveOrg = await Team.findOneAndUpdate({_id : new TypeObj(senderId)}, {$push : {requests : reqOrg._id}})
  const sendOrg = await Organisation.findOneAndUpdate({_id : new TypeObj(receiverId)}, {$push : {requests : reqOrg._id}})
  console.log(reqOrg, sendOrg)
  //if the current _id and broadcast _id is same, then re requet the requests 
  socket.broadcast.emit('receive-request', receiveOrg._id)
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

//Organisation Sending Resource
socket.on('assign-team-resource', async (request, cb) =>{
  //socket.join(room)
  if(request.organisationId && request.teamId){  
    const organisation = await Organisation.findOne({_id : request.organisationId})
    const team = await Team.findOne({_id : request.teamId})
    let assigned = false
    console.log(organisation, organisation.resources)
    organisation.resources.forEach(async (resource) => {
      if(resource.type == request.resource.type)
      {
        if(resource.number - request.resource.number >= 0)
        {
          //assign resource
        const team = await Team.findOneAndUpdate({_id : request.teamId}, {$push : {resources : request.resource}})
        const organisation = await Organisation.findOneAndUpdate({_id : request.organisationId, 'resources.type': resource.type}, { $inc: { 'resources.$.number': -1 * request.resource.number}})
        assigned = true;
        console.log("Hello, jkfdkjlsdf")
        cb(
          {
            status: "success",
            data: {
                request : organisation.resources,
            }
        })
      }
      else{
        cb({
          status: "failure",
          data: {
              message : "not enough resources",
          }
      })
      }
    }
  })
  console.log(assigned)
  if(!assigned){
//  cb({
//    status: "failure",
//    data: {
//        message : "No such resource",
//    }
//})
}
  console.log(request.teamId)
  //if the current _id and broadcast _id is same, then re requet the requests 
  socket.broadcast.emit('receive-resource', request.teamId)
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

//Team Getting Resource
socket.on('team-get-resource', async (request, cb) =>{
  
  if(request.teamId){
  const team = await Team.findOne({_id : request.teamId})
  if(!team)
  {
    cb(
      {
        status: "failure",
        data: {
            message : "No Such Team Exists" ,
        }
    }
    )
  }
  cb(
    {
      status: "success",
      data: {
          resource : team.resources ,
      }
  })
}
  else
  {
    cb({
      status: "failure",
      data: {
          message : "Provide the team id",
      }
  })
  }
})
})