const sendMessageService = require('../services/sendMessage.service');

module.exports = (req, res)=> {

    sendMessageService.showSendMessageData(req.body.friendId)
    .then(data=>{
        res.json({result: data});
    })
    .catch(err => {
        res.json({ result:'Something Went Wrong!!'})
    })
}