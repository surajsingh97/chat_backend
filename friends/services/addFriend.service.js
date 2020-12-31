const friend = require('../models/addFriend.model');
const user = require('../../user/model/user.model');

exports.friendObj = (userId, friendId, name)=> {
    try
    {
        return new friend({
            userId: userId,
            friends: [
                {
                    friendId: friendId,
                    userName: name
                },
            ],
            
        });
    }
    catch(error)
    {
        throw error
    }
}

exports.saveData = (friend)=> {
    try
    {
        return friend.save();
    }
    catch(error)
    {
        throw error
    }
}

exports.findFriendDataById = (id)=> {
    try
    {
        return friend.findOne({userId:id});   
    }
    catch(error)
    {
        throw error
    } 
}

exports.findUserByName = (userName)=>{
    try
    {
        return user.findOne({userName: userName});   
    }
    catch(error)
    {
        throw error
    }
}

exports.findAndUpdateFriendId = (userId, friendId, name)=>{
    try
    {
        return friend.findOneAndUpdate({ userId: userId},{$push: {friends: {friendId: friendId, userName:name}}},{new : true});
    }
    catch(error)
    {
        throw error
    }
}

exports.findExistingFriend = (userId, friendId)=>{
    try
    {
        return friend.find({userId: userId, friends:{$elemMatch:{friendId : friendId}}});
    }
    catch(error)
    {
        throw error
    }
}


