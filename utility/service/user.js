const joinedUsers = [];
const onlineUser = require('./activeuser.model');
const message = require('../../chat/models/sendMessage.model')
exports.userjoin = (id,room)=>{
    const user = {id,room};
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
    return joinedUsers.find(user => user.id === user.id);
}

exports.getOnlineusers =  () =>{
    const data = onlineUser.find()
    return data;
}

exports.showSendMessageData = (data)=>{
    const messages = message.find()
    return messages
}