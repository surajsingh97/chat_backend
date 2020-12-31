const friend = require('../models/addFriend.model');

exports.findAndDeleteFriendId = (friendId)=>{
    try
    {
        return friend.updateMany({},{$pull: { friends: { friendId: friendId} } });
    }
    catch(error)
    {
        throw error
    }
}