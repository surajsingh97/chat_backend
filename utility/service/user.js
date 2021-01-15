const joinedUsers = [];
const onlineUser = require('./activeuser.model');
const message = require('../../chat/models/sendMessage.model');
const friendService = require('../../friends/services/show.service');
exports.userjoin = (room)=>{
    const user = {room};
    joinedUsers.push(user);
    return joinedUsers;
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

exports.getcurrentUser = (id) => {
    return joinedUsers.find(user => user.room === user.room);
}

exports.getOnlineusers =  () =>{
    const data = onlineUser.find()
    return data;
}

exports.showlastmessageData = async (req)=>{
    let friendList =  await friendService.showFriendList(req)
    let chat = await message.find().select({ "chats": { "$slice": -1 }});
    let arrayC = [];
    await friendList.friends.forEach(function(element){
       arrayC.push({
       friendId:element.friendId,
       userName:element.userName,
       chat:(chat.find(e=>e.friendId===element.friendId)) || { chats:[{createdOn :''}]}
       });  
     });
     return arrayC;
    
}