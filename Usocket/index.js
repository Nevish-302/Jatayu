const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});


console.log(io);

let organizations = [];
let Request;

io.on('connection', (socket) => {
  console.log('new connection', socket.id);

//   //listen to  a connection
  socket.on('addOrganizations', (Id) => {
    !organizations.some((organisation) => organisation.Id === Id) &&
      organizations.push({
        Id,
        socketId: socket.id,
      });
      console.log("organizations", organizations);
    //   io.emit("getOrganisations", organizations);
  });


  //add request 
  socket.on("new-request", async(newRequest)=>{
    console.log(newRequest);
    console.log("hello");

    const organisation =await organizations.find((organisation) => organisation.Id === newRequest.receiverId);

    console.log("org",organisation);
    if(organisation){

    io.to(organisation.socketId).emit("get-request", newRequest);

      socket.on("get-request" ,(request , organisation) =>{
        
        console.log(request , organisation);
       
    
      })


    //   io.to(organisation.socketId).emit("getNotification", {senderId: message.senderId,
    //     isRead:false,
    //     date: new Date(),
    //   }
    //   )
    }
  })

  socket.on("disconnect", ()=>{
    organizations = organizations.filter((organisation)=> organisation.socketId !== socket.id);
    io.emit("getOrganisations", organizations);
  });

});



io.listen(9000);
module.exports = { io };
