const friend = require('../model/friend.model');
const friendService = require('../service/friendservice');
const jwt = require('jsonwebtoken');

exports.func = (req,res) =>{
    const personName = req.body.userName;
    const token = req.token;
    const payload = jwt.verify(token, 'secret_key');
    const userId = payload.id._id;
    const selfName = payload.id.userName;
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
                            friendService.findAndUpdateFriendId(userId,friendId, personName).then(data =>{
                                console.log("updated data of user", data);
                                friendService.findfriendbyId(personId).then((data,err)=>{
                                    if(data){
                                        console.log("person updated",data)
                                        friendService.findAndUpdateFriendId(personId,friendId,selfName);
                                    }else{
                                        const personfriendData = friend.create({userId: personId,friends:[{friendId: friendId, userName:selfName}] });
                                    }
                                });
                            });
                            
                        }
                    })
                    
                }else{
                       const selffriendData = friend.create({userId: userId,friends:[{friendId: friendId,userName:personName}] });
                       friendService.findfriendbyId(personId).then((data,err)=>{
                           console.log(data,"this is data1");
                           if(data){
                               console.log(data,"this is data2");
                               friendService.findAndUpdateFriendId(personId,friendId,selfName);
                           }else{
                               const personfriendData = friend.create({userId: personId,friends:[{friendId: friendId,userName:selfName}] });
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
            console.log(data);
            res.send(data);
        }else{
            res.send("No friends")
        }
    })
}

