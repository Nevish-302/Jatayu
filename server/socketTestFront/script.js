import {io} from "socket.io-client"
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const roomInput = document.getElementById('room')
const joinroombutton = document.getElementById('join-room')
const messageInput = document.getElementById('message-input')
console.log("Hello")
//different for different routes
//const userSocket = io('http://localhost:3000/user', {auth: {token: 'test'}})
const socket = io('http://localhost:4000/socket')

socket.on("connect",()=> {
appendMessage(`Connected with id : ${socket.id}`)
socket.emit('custom-event', 10, 'a', {Hello : "jack"})
})

//keydown not working for some reason
document.addEventListener("keydown", e => {
  
    if(e.target === 'c')
    {
      socket.connect()
    }
    if(e.target === 'd')
    {
      socket.disconnect()
    }
  
})

let count = 0
//setInterval(() =>
//  {socket.volatile.emit('ping', ++count)}, 
//1000)

//userSocket.on(`connect_error`, error => {
//    appendMessage(error)
//})
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  const room = roomInput.value
  appendMessage(`You: ${message}`)
  
  socket.emit('send-chat-message', message, room)
  
  messageInput.value = ''
  roomInput.value = ''
})

messageForm.addEventListener('Jack', e => {
  console.log('Baby')
})

joinroombutton.addEventListener('click', e => {
  const room = roomInput.value
  console.log("ello")
  socket.emit('join-room', room, message => {
    appendMessage(message);
  })
})

socket.on('receive-message', (message) =>{
  appendMessage(`Sender: ${message}`);
})


function appendMessage(message) {
  //socket.emit('send-message', message);
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}