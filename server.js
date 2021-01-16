const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./utility/service/helper/db');
const userRoute = require("./user/router/user.route");
const addRoute = require('././friends/routes/addFriend.route');
const deleteRoute = require('././friends/routes/deleteFriend.route');
const showRoute = require('././friends/routes/showFriend.route');
const messageControl = require('./chat/controllers/sendMessage');
const messageRoute = require('./chat/routes/showSendMessage.route');
const whitelist = ['http://localhost:4200', 'http://example2.com'];
const users = require('./utility/service/user');
const onlineUser = require('./utility/service/activeuser.model');
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)
      callback(new Error('Not allowed by CORS'));
  }
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(cors());
app.use("/", userRoute);
app.use("/", addRoute);
app.use('/', deleteRoute);
app.use("/", showRoute);
app.use('/',messageRoute);


io.sockets.on('connection', function(socket){
  // console.log("User Connected");
  socket.on('joined', data =>{
    const user = users.userjoin(data.id)
    socket.join(user.room);
  })
  socket.on('message',(message)=>{
    const user = users.getcurrentUser(message.friendId)
    messageControl.sendMessage(message);
    socket.broadcast.emit('new-message', message);
  })

  socket.on('typing', (data)=>{
   const user = users.getcurrentUser(socket.id)
    socket.broadcast.emit('typing', data);
  })

  socket.on('nottyping', data =>{
    const user = users.getcurrentUser(socket.id)
    socket.broadcast.emit('nottyping',data);
  })

  socket.on('onlogin',data =>{
    users.onlineUsers(data);
  })
  
  socket.on('user', data =>{
   users.getOnlineusers().then(data=>{
      io.emit('login', data);
    })
  })
  
  socket.on('onlogout', data => {
    const temp = data;
   users.userLeave(data).then(data=>{
     if(data.deletedCount === 1){
       onlineUser.find().then(data =>{
       io.emit('logout',temp);
      })
     }
   });
  })

  socket.on('getlastMessage', data =>{
    users.showlastmessageData().then(Data=>{
      io.emit('notify',Data);
    })
});


});


http.listen(3000, () => {
  console.log('listening on *:3000');
})