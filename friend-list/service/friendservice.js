const user = require('../../user/model/user.model');
const friends = require('../model/friend.model');

exports.findUser = (userName)=>{
    try{
        return user.findOne({userName:userName});

    }catch(err){
        console.log(err);
    }
}

exports.findselfbyId = (id) =>{
    try{
        return friends.findOne({userId:id});
    }catch(err){
        console.log(err);
    }
}

exports.findAndUpdateFriendId = (userId, friendId)=>{
    try
    {
        return friends.findOneAndUpdate({ userId: userId},{$push: {friends: {friendId: friendId}}},{new : true});
    }
    catch(error)
    {
        throw error
    }
}

exports.findfriendbyId = (userId) => {
    try{
        return friends.findOne({userId: userId});
    }catch(err){
        throw(err);
    }
}

exports.findExistingFriend = (userId, friendId)=>{
    try
    {
        return friends.find({userId: userId, friends:{$elemMatch:{friendId : friendId}}});
    }
    catch(error)
    {
        throw error
    }
}

exports.findallFriend = (userId) => {
    try{
        return friends.find({userId: userId});
    }catch(err){
        throw err;
    }
}