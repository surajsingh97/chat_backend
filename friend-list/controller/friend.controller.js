const friend = require('../model/friend.model');
const friendService = require('../service/friendservice');
const jwt = require('jsonwebtoken');

exports.func = (req,res) =>{
    const personName = req.body.userName;
    console.log(personName);
    const token = req.token;
    const payload = jwt.verify(token, 'secret_key');
    const userId = payload.id._id;
    console.log(userId,'userId');
    console.log(personName);
    friendService.findUser(personName).then((data,err)=>{
        if(data){
            personId=data._id
            const friendId = `${userId} ${personId}`
            friendService.findselfbyId(userId).then((data,err)=>{
                if(data){
                    friendService.findAndUpdateFriendId(userId,friendId);
                }else{
                       const friendData = friend.create({userId: userId,friends:[{friendId: friendId}] });
                       friendService.findfriendbyId(personId).then((data,err)=>{
                           if(data){
                               friendService.findAndUpdateFriendId(personId,friendId);
                           }else{
                               const anotherfriendData = friend.create({userId: personId,friends:[{friendId: friendId}] });
                           }
                       })
                }
            })
        }else{
            res.send('User Not found');
        }
    })
}

