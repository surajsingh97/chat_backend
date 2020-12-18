const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const mongoose = require("mongoose");

const db = "mongodb://localhost/chatdb";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

mongoose.connect(db, (err) => {
  if (err) {
    console.log("error!" + err);
  } else {
    console.log("database connected");
  }
});


io.sockets.on('connection', function(socket){
  console.log("User Connected");
  socket.on('message',(message)=>{
    console.log(message);
    // socket.broadcast.emit('message-broadcast',message)
  })
});


const userRoute = require("./user/router/user.route");
const friendRoute = require('./friend-list/router/friend.route')

const whitelist = ['http://localhost:4200', 'http://example2.com'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));


const port = 3000;
app.use("/", userRoute);
app.use("/", friendRoute);
app.listen(port,(err)=>{
  console.log('runnig well');
});
