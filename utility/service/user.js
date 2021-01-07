const joinedUsers = [];
const onlineUser = require('./activeuser.model');
exports.userjoin = (id,username,room)=>{
    const user = {id,username,room};
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