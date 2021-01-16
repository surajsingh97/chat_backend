const friendService = require('../services/show.service');
const message = require('../../chat/models/sendMessage.model')

exports.getFriends = async (req, res)=> {
   let friendList =  await friendService.showFriendList(req.body.userId)
   let chat = await message.find().select({ "chats": { "$slice": -1 }});
   let arrayC = [];
   await friendList.friends.forEach(function(element){
      arrayC.push({
      friendId:element.friendId,
      userName:element.userName,
      chat:(chat.find(e=>e.friendId===element.friendId)) || { chats:[{createdOn :''}]}
      });  
    });
   
    res.send(arrayC);
   }

