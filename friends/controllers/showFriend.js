const friendService = require('../services/show.service');

exports.getFriends = (req, res)=> {

    console.log(req.body.userId);
    friendService.showFriendList(req.body.userId)
    .then(data=> {
        res.json({result:data})
    })
    .catch(err=> {
        res.json({result: 'Something Went Wrong!!'})
    })
}