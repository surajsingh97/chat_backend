const friendService = require('../services/deleteFriend.service');
const { json } = require('express');

exports.delete = (req, res)=> {

    friendService.findAndDeleteFriendId(req.body.friendId)
    .then(data=> {
        if(data.nModified){
            res.json({result: 'Deleted Successfully!'})
        }
        else{
            res.json({result: 'Already Deleted!'})
        }
    })
    .catch(err=> {
        res.json({result: 'Something Went Wrong!!'})
    })
}