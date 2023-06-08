// node server which will handle socket io connection
// socket id is unique for each user
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  }); 
// this means we are using port 8000
//here io is treated as server
const users ={};

io.on('connection',socket =>{
  // if someone join tell others
    socket.on('new-user-joined',name=>{
        // console.log("New user",name)//this will show name of new user on console
          users[socket.id]=name;
          socket.broadcast.emit('user-joined',name);
    });
    // if someone send message tell others
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    // if someone leaves tell others
    // it will broadcast the message to others by passing receive named event
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
    // diconnect is BULILT IN
    // when user leave the chat so this event is fired
    // when user leave the chat so this event is fired
})
// we are updating const user 
// it means when there is connection so run this functiona and when user joined so run the other function
// HERE USER-JOINED AND CONNECTION ARE THE CUSTOM EVENTS
// socket.io will listen to incomng connections
// io.on is instance of socket theat will listen to the connection
// socket.on it mean it will handle what will happen to that particulat user
//when socket.on so when someone is connected so give it a key socket.id and give this to name
// when a user add between chat so we show it name to all the other people that he have joined so socket.broadcast.emit to all the other  
// and give name of user

// NAME OF EVENT CAN BE ANY ITS NOT PREDEFINED