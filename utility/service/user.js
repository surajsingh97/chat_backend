
const onlineUser = require('./activeuser.model');
const message = require('../../chat/models/sendMessage.model');
const friendService = require('../../friends/services/show.service');

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

exports.showlastmessageData = (req)=>{
    let chat =  message.find().select({ "chats": { "$slice": -1 }});
    return chat;
    
}