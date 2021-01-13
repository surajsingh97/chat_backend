const sendMessageService = require('../services/sendMessage.service');
const message = require('../models/sendMessage.model')

exports.showMessages = (req, res)=> {

    sendMessageService.showSendMessageData(req.body.friendId)
    .then(data=>{
        res.send(data);
    })
    .catch(err => {
        res.json({ result:'Something Went Wrong!!'})
    })
}
// exports.showSendMessageData = (req,res)=>{
//     message.find().then(data=>{
        
//     })
// }