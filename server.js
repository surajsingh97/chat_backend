const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

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

const postroute = require("./user/router/user.route");

const port = 3000;
app.use(cors());
app.use("/static", express.static("assest"));
app.use("/", postroute);

app.listen(port, () => {
  console.log("runing well");
});