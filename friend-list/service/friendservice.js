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