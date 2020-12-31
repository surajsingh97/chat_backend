const friend = require('../models/addFriend.model');

exports.showFriendList = (userId)=>{
    try
    {
        return friend.findOne({userId: userId});
    }
    catch(error)
    {
        throw error
    }
}