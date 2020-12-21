const sendMessage = require('../models/sendMessage.model');

exports.sendMessageObj = (data)=> {
    try
    {   
        const createdOn = new Date();
        return new sendMessage({
            friendId: data.friendId,
            chats: [
                {
                    message: data.message,
                    createdOn: createdOn,
                    senderId: data.senderId,
                    receiverId: data.receiverId
                }
            ],
        });
    }
    catch(error)
    {
        throw error
    }
}

exports.saveData = (sendMessage)=> {
    try
    {
        return sendMessage.save();
    }
    catch(error)
    {
        throw error
    }
}

exports.findSendMessageDataByFriendId = (friendId)=> {
    try
    {
        return sendMessage.findOne({friendId: friendId});   
    }
    catch(error)
    {
        throw error
    }
}

exports.findAndupdateSendMessageData = (data)=> {
    try
    {   
        const createdOn = new Date();
        return sendMessage.findOneAndUpdate({ friendId: data.friendId},{$push: {chats: 
            {
                message: data.message,
                createdOn: createdOn,
                senderId: data.senderId,
                receiverId: data.receiverId
            }}},{new : true});   
    }
    catch(error)
    {
        throw error
    }
}

exports.showSendMessageData = (friendId)=> {
    try
    {
        return sendMessage.findOne({friendId: friendId});
    }
    catch(error)
    {
        throw error
    }
}
