const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require("mongoose");
const db = "mongodb://localhost/chatdb";
const userRoute = require("./user/router/user.route");
const friendRoute = require('./friend-list/router/friend.route');
const whitelist = ['http://localhost:4200', 'http://example2.com'];
import {chatControl} from './chat/router/sendMessage'
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
app.use(cors(corsOptions));
app.use("/", userRoute);
app.use("/", friendRoute);
app.use("/", chatControl);
mongoose.connect(db, (err) => {
  if (err) {
    console.log("error!" + err);
  } else {
    console.log("database connected");
  }
});

io.sockets.on('connection', function(socket){
  socket.on('message',(message)=>{
    console.log(message);

    socket.broadcast.emit('new-message', message);
    })

    socket.on('disconnect',()=>{
      console.log("user gaya")
    })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});