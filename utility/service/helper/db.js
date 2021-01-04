const mongoose = require("mongoose");
const db = "mongodb://localhost/chatdb";
mongoose.connect(db, (err) => {
    if (err) {
      console.log("error!" + err);
    } else {
      console.log("database connected");
    }
  });