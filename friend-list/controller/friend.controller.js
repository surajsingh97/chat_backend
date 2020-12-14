const friend = require('../model/friend.model');
const friendService = require('../service/friendservice');
const jwt = require('jsonwebtoken');

exports.func = (req,res) =>{
    const personName = req.body.userName;
    const token = req.token;
    const payload = jwt.verify(token, 'secret_key');
    const userId = payload.id._id;
    friendService.findUser(personName).then((data,err)=>{
        if(data){
            personId=data._id
            const friendId = `${userId} ${personId}`
            friendService.findselfbyId(userId).then((data,err)=>{
                if(data){
                    friendService.findAndUpdateFriendId(userId,friendId);
                    friendService.findfriendbyId(personId).then((data,err)=>{
                        if(data){
                            friendService.findAndUpdateFriendId(personId,friendId);
                        }else{
                            const personfriendData = friend.create({userId: personId,friends:[{friendId: friendId}] });
                        }
                    })
                }else{
                       const selffriendData = friend.create({userId: userId,friends:[{friendId: friendId}] });
                       friendService.findfriendbyId(personId).then((data,err)=>{
                           if(data){
                               friendService.findAndUpdateFriendId(personId,friendId);
                           }else{
                               const personfriendData = friend.create({userId: personId,friends:[{friendId: friendId}] });
                           }
                       })
                }
            })
        }else{
            res.send('User Not found');
        }    })
}

