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

                    console.log("data::: ",data);
                    friendService.findExistingFriend(userId,friendId).then((data,err)=>{
                        if(data.length){
                            console.log("user exist",data);
                            res.send("User Already Exist");
                        }else{
                            friendService.findAndUpdateFriendId(userId,friendId).then(data =>{
                                console.log("updated data of user", data);
                                friendService.findfriendbyId(personId).then((data,err)=>{
                                    if(data){
                                        console.log("person updated",data)
                                        friendService.findAndUpdateFriendId(personId,friendId);
                                    }else{
                                        const personfriendData = friend.create({userId: personId,friends:[{friendId: friendId}] });
                                    }
                                });
                            });
                            
                        }
                    })
                    
                }else{
                       const selffriendData = friend.create({userId: userId,friends:[{friendId: friendId}] });
                       friendService.findfriendbyId(personId).then((data,err)=>{
                           console.log(data,"this is data1");
                           if(data){
                               console.log(data,"this is data2");
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

exports.getFriend= (req,res) => {
    const id = req.body.userId;
    friendService.findallFriend(id).then(data =>{
        if(data){
            res.send(data);
        }else{
            res.send("No friends")
        }
    })
}

