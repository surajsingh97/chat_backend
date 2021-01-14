const joinedUsers = [];
const onlineUser = require('./activeuser.model');
const message = require('../../chat/models/sendMessage.model')
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

exports.showlastmessageData = ()=>{
    const chat =  message.find().select({ "chats": { "$slice": -1 }});
    return chat;
    
}