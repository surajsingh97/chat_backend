const sendMessageService = require('../services/sendMessage.service');

exports.showMessages = (req, res)=> {

    sendMessageService.showSendMessageData(req.body.friendId)
    .then(data=>{
        res.send(data);
    })
    .catch(err => {
        res.json({ result:'Something Went Wrong!!'})
    })
}