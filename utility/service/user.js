const onlineUser = require('./activeuser.model');
const message = require('../../chat/models/sendMessage.model');
const friendService = require('../../friends/services/show.service');
const users = [];

// Join user to chat
exports.userJoin = (id, room)=>{
  const user = { id, room };
  users.push(user);
  return user;
}

exports.getCurrentUser = (id,roomId) => {
   return users.find(user => ((user.id === id) && (user.room === roomId)))
 }


exports.onlineUsers = (data) => {
    try
    {
        const user = onlineUser.create({userName: data});
    }
    catch(error)
    {
        throw error
    }
}

exports.userLeave = (username) => {
    return onlineUser.remove({'userName': username});
}

exports.getOnlineusers =  () =>{
    const data = onlineUser.find()
    return data;
}

exports.showlastmessageData = async (req)=>{
    let chat =  await message.find().select({ "chats": { "$slice": -1 }});
    // console.log(chat);
    return chat;
    
}