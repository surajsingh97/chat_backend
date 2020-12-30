const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require("mongoose");
const db = "mongodb://localhost/chatdb";
const userRoute = require("./user/router/user.route");
const friendRoute = require('./friend-list/router/friend.route')
const messageControl = require('./chat/controllers/sendMessage')
const messageRoute = require('./chat/routes/showSendMessage.route');
const whitelist = ['http://localhost:4200', 'http://example2.com'];
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
app.use("/", friendRoute);
app.use('/',messageRoute);

mongoose.connect(db, (err) => {
  if (err) {
    console.log("error!" + err);
  } else {
    console.log("database connected");
  }
});

io.sockets.on('connection', function(socket){
  // console.log("User Connected");
  socket.on('message',(message)=>{
    console.log(message);
    messageControl.sendMessage(message);
    socket.broadcast.emit('new-message', message);
  })

  socket.on('typing', (data)=>{
    console.log(data);
    socket.broadcast.emit('typing', data);
  })

  socket.on('nottyping', data =>{
    socket.broadcast.emit('nottyping',data);
  })

  socket.on('online',data =>{
    console.log('im online');
    socket.broadcast.emit('onlogin',data);
  })
  
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});