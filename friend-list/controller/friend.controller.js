const friend = require('../model/friend.model');
const friendService = require('../service/friendservice');
const jwt = require('jsonwebtoken');

exports.func = (req,res) =>{
    const userName = req.body.userName;
    const token = req.token;
    const payload = jwt.verify(token, 'secret_key');
    const personId = payload.id._id;
    console.log(personId,'person id')
    console.log(userName);
    friendService.findUser(userName).then((data,err)=>{
        if(data){
        
        }else{
            res.send('User Not found');
        }
    })
}