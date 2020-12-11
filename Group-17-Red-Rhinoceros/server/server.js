const express = require('express')
var path = require('path') 
const cors = require('cors');
const router = require('./routes/index')
const bodyParser = require('body-parser')

// keep a reference of all socket connections
var connectedPeers = new Map()
var rooms = []
var screenShare = []
var whiteboard = new Map();

var io = require('socket.io')
({
  path: '/webrtc'
})

const app = express()
const port = 8080

//https://expressjs.com/en/guide/writing-middleware.html
app.use(express.static(__dirname + '/../build'))
app.get('/', (req, res, next) => { 
  // res.sendfile(__dirname + '/../build/index.html')
  console.log('request is: ' + req)
})
app.use(cors())
app.use(router)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

io.listen(server)


// https://www.tutorialspoint.com/socket.io/socket.io_namespaces.htm
const peers = io.of('/room')
const peersAdmin = io.of('/admin')

peersAdmin.on('connection', socket => {
  console.log('server has receive a connection from ' + socket.id)
  socket.emit('connection-success', { success: socket.id })

  socket.on('checkJoin',(data) => { 
    console.log(rooms)
    if(rooms.includes(data.payload.room)) { 
      socket.emit('joinAccept', {
      room: data.payload.room,
      message: "room " + data.payload.room + " exists, now can join"
      })
      console.log('now can join room ' +data.payload.room)
    } else { 
      socket.emit('joinReject', {
      room: data.payload.room,
      message: "room " + data.payload.room + " does not exist, please check"
      })
      console.log('unable to join room '+data.payload.room)
    }
  })
})
  
peers.on('connection', socket => {

  console.log('server has receive a connection from ' + socket.id)
  socket.emit('connection-success', { success: socket.id })
  
  socket.on('createRoom', (data) => {
    rooms.push(data.payload.room)
    console.log("room number " + data.payload.room + " was created by " + data.socketID)
    
    socket.join(data.payload.room) 
    connectedPeers.set(socket.id, {socket:socket, room:data.payload.room});
    if (!whiteboard.has(data.payload.room)){
      whiteboard.set(data.payload.room,new Array());
    }
    
    console.log("rooms is") 
    console.log(rooms)
      
  })
  
  socket.on('joinRoom', (data) => { 
    console.log(data.socketID + " has joined room: " + data.payload.room)
    socket.join(data.payload.room) 
    connectedPeers.set(socket.id, {socket:socket, room:data.payload.room})
    let members = []
    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.socketID) {
        members.push(socketID)
      }
      socket.emit("roomInfo",{room:data.payload.room,details:members,whiteboard:whiteboard.get(data.payload.room)})
    }
    console.log("rooms is") 
    console.log(rooms)
    console.log("room " + data.payload.room+" has "+ (members.length+1)+" members")
  })
  //if a user is disconnected, remove it from screenshare array if existed 
  socket.on('disconnect', () => {

    for (const [socketID, info] of connectedPeers.entries()) {
      if (connectedPeers.get(socket.id).room == info.room &&  socketID !== socket.id) {
        connectedPeers.get(socketID).socket.emit("GuestLeaving",{
          socketID: socket.id,
        });
      }
    }
    if(screenShare.includes(socket.id)) { 
      screenShare.shift() 
      console.log(screenShare)
    }
    connectedPeers.delete(socket.id)
    console.log('server has been disconnected by ' + socket.id)
    
  })

  socket.on('offer', (data) => {
    // send to the specific peer if any 
    console.log('receive offer from ' + data.socketID)
    connectedPeers.get(data.payload.toId).socket.emit("offer",{id:data.socketID,payload:data.payload.sdp})
  })

  socket.on("answer",(data) => { 
    // send to specific peer 
    console.log("receive answer from "+data.socketID) 
    connectedPeers.get(data.payload.toId).socket.emit("answer",{id:data.socketID, payload:data.payload.sdp})
  })

  socket.on("candidate",(data) => { 
    // send to specific peer 
    console.log("receive candidate from "+data.socketID) 
    console.log("debug--"+data.payload.toId)
    connectedPeers.get(data.payload.toId).socket.emit("candidate",{id:data.socketID, payload:data.payload.info})
  })

  // receive chat message from client and update messages back to clients
  socket.on("sendChat", (data) => {
    //console.log(data.payload.message)
    let message = data.payload.user + " says: " + data.payload.message
    for (const [socketID, info] of connectedPeers.entries()) {
      if (info.room == data.payload.room) {
        connectedPeers.get(socketID).socket.emit("receiveChat", {
          room: data.payload.room,
          message: message
        })
      } 
    }
  })

  // check if there are any user currently sharing in the room 
  // if any user is sharing screen in a room, then reject anyother user to share in the room 
  socket.on("screenShareRequest", (data) => { 
    console.log("receive screen share request from "+ data.socketID) 
    console.log("room "+ data.payload.room + " has "+ screenShare.length + " people screening sharing")
    if(screenShare.length == 1) { 
      socket.emit("screenRejected", { 
        room: data.payload.room,
        current: screenShare[0], 
        message: "room " + data.payload.room + " has a screen share by "+screenShare[0] 
      })
    } 
    if(screenShare.length ==0) { 
      socket.emit("screenAccepted", { 
        room: data.payload.room,
        message: "room " + data.payload.room + " is avaible to share screen "
      })
    }
  })
  // called when a user starts to share the screen 
  socket.on("screenShareStart", (data) => { 
    console.log("room " + data.payload.room + " start screen sharing by " + socket.id)
    screenShare.push(socket.id) 
    console.log("room "+ data.payload.room + " has "+ screenShare.length + " people screening sharing")
  })
  // update the screen share array 
  socket.on("screenShareStop", (data)=> { 
    console.log("room " + data.payload.room + " stop screen sharing by " + socket.id) 
    if(screenShare.includes(socket.id) && screenShare.length == 1) { 
      screenShare.shift() 
    } else { 
      console.log(socket.id + " wants to stop sharing screen,  something is wrong ")
    }
  })

  socket.on('SSoffer', (data) => {
    // send to the specific peer if any 
    console.log('receive SSoffer from ' + data.socketID)
    connectedPeers.get(data.payload.toId).socket.emit("SSoffer",{id:data.socketID,payload:data.payload.sdp})
  })


  socket.on('muteOne', (data) => {
    // mute specific user 
    console.log('receive muteOne from ' + data.socketID)
    socket.emit('muteSelf', { 
      room: data.payload.room,
    })

    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.socketID) {
        connectedPeers.get(socketID).socket.emit("muteOther",{
          room:data.payload.room,
          socketID:data.socketID})
      }
      
    }
  })

  socket.on('unmuteOne', (data) => {
    // mute specific user 
    console.log('receive unmuteOne from ' + data.socketID)
    socket.emit('unmuteSelf', { 
      room: data.payload.room,
    })

    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.socketID) {
        connectedPeers.get(socketID).socket.emit("unmuteOther",{
          room:data.payload.room,
          socketID:data.socketID})
      }
      
    }
  })

  socket.on('muteSpecificUser', (data) => {
    // mute specific user 
    console.log('receive muteSpecificUser from ' + data.socketID)

    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.payload.ID) {
        connectedPeers.get(socketID).socket.emit("muteOther",{
          room:data.payload.room,
          socketID:data.payload.ID})
      }
      //send to the ID to mute the user 
      if(info.room == data.payload.room &&  socketID === data.payload.ID) { 
        connectedPeers.get(socketID).socket.emit('muteSelf', { 
          room: data.payload.room,
        })
      }
      
    }
  })

  socket.on('unmuteSpecificUser', (data) => {
    // mute specific user 
    console.log('receive unmuteSpecificUser from ' + data.socketID)

    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.payload.ID) {
        connectedPeers.get(socketID).socket.emit("unmuteOther",{
          room:data.payload.room,
          socketID:data.payload.ID})
      }
      //send to the ID to unmute the user 
      if(info.room == data.payload.room &&  socketID === data.payload.ID) { 
        connectedPeers.get(socketID).socket.emit('unmuteSelf', { 
          room: data.payload.room,
        })
      }
      
    }
  })
  

  //end meeting for all
  socket.on('endMeeting', (data) => {

    console.log('receive endMeeting from ' + data.socketID)
    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to end meeting
      if (info.room == data.payload.room) {
        console.log("snedto + " +socketID)
        connectedPeers.get(socketID).socket.emit('endMeeting',{
          room:data.payload.room})
      }
      
    }
  })
  

  // send the update for the canvas
  socket.on('UpdateWhiteboard', (data)=>{
    if (!whiteboard.has(data.payload.room)){
      whiteboard.set(data.payload.room,[data.payload.pos]);
    }else{
      whiteboard.get(data.payload.room).push(data.payload.pos);
    }
    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.socketID) {
        connectedPeers.get(socketID).socket.emit("UpdateCanvas",{
          room:data.payload.room,
          socketID:data.socketID,
          pos: data.payload.pos});
      }
    }
  })

  socket.on("ClearWhiteboard", (data) => {
    whiteboard.set(data.payload.room, new Array());
    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.socketID) {
        console.log("clean canvas");
        connectedPeers.get(socketID).socket.emit("ClearWhiteboard",{
          room:data.payload.room,
          socketID:data.socketID
        });
      }
    }
  } );

  socket.on('handsUp', (data) => {

    console.log('receive handsUp from ' + data.socketID + ", name" + data.payload.username)
    
    for (const [socketID, info] of connectedPeers.entries()) {
      //send members in the same room to socket 
      if (info.room == data.payload.room &&  socketID !== data.socketID) {
        connectedPeers.get(socketID).socket.emit("handsUp",{
          room:data.payload.room,
          socketID:data.socketID,
          username:data.payload.username
        })
      }
      
    }
  })



})
