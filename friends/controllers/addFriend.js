const friendService = require('../services/addFriend.service');
const jwt = require('jsonwebtoken');

exports.func = (req,res)=>{
    const token = req.token;
    const payload = jwt.verify(token, 'secret_key');
    const userId = payload.id._id;
    const selfName = payload.id.userName;
    friendService.findUserByName(req.body.userName)
    .then(newUser=> {
        if(newUser){
            const friendId = `${userId} ${newUser._id}`;
            friendService.findFriendDataById(userId)
            .then(friendData=>{

                if(friendData){
                    //checking already have friend or not
                    friendService.findExistingFriend(newUser._id, friendId)
                    .then(data=> {
                        if(data.length){
                            res.json({ result: 'Already Exists in friend list!!'})
                        } 
                        else{
                            //add id in new friend data
                            userAlreadyExists(userId, friendId, req.body.userName)
                            .then(data=> {
                                addFriendIdInNewUser(res, newUser._id, friendId,selfName )
                            })
                            .catch(err => {
                                console.log('wrong 1');
                                res.json({ result:'Something Went Wrong!!'})
                            })
                        }
                    })
                    
                    
                }
                else{
                    const friendObj = friendService.friendObj(userId, friendId, req.body.userName);
                    friendService.saveData(friendObj)
                    .then(data => {
                        //add id in new friend data
                        addFriendIdInNewUser(res, newUser._id, friendId, selfName);
                    })
                    .catch(err => {
                        console.log('wrong 2');
                        res.json({ result:'Something Went Wrong!!'})
                    })
                }

            })
            .catch(err => {
                console.log('wrong 3');
                res.json({ result:'Something Went Wrong!!'})
            })
        }
        else{
            res.json({ result: 'User Not Found!!'})
        }
    })
}



function addFriendIdInNewUser(res, userId, friendId, selfName){
    friendService.findFriendDataById(userId)
            .then(friendData=>{
                if(friendData){
                    //add id in new friend data()
                    userAlreadyExists(userId, friendId, selfName)
                    .then(data=> {
                        res.json({ result:'Added Successfully!'})
                    })
                    .catch(err => {
                        console.log('wrong 5');
                        res.json({ result:'Something Went Wrong!!'})
                    })
                }
                else{
                    const friendObj = friendService.friendObj(userId, friendId, selfName);
                    friendService.saveData(friendObj)
                    .then(data => { 
                        res.json({ result:'Added Successfully!'})
                    })
                    .catch(err => {
                        console.log('wrong 6');
                        res.json({ result:'Something Went Wrong!!'})
                    })
                }

            })
            .catch(err => {
                console.log('wrong 7');
                res.json({ result:'Something Went Wrong!!'})
            })
}



function userAlreadyExists(userId, friendId, personName){
    return friendService.findAndUpdateFriendId(userId, friendId, personName);
}

