const friendService = require('../services/show.service');
const message = require('../../chat/models/sendMessage.model')

exports.getFriends = async (req, res)=> {
    friendService.showFriendList(req.body.userId)
    .then(data=> {
        res.json({result:data})
    })
    .catch(err=> {
        res.json({result: 'Something Went Wrong!!'})
    })
}
