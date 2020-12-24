const sendMessageService = require('../services/sendMessage.service');

exports.sendMessage = (req, res)=> {
    console.log(req.body);
    sendMessageService.findSendMessageDataByFriendId(req.body.friendId)
    .then(data=> {
        if(data){

            sendMessageService.findAndupdateSendMessageData(req.body)
            .then(data=>{
                res.json({result: 'Messaged Successfully'});
            })
            .catch(err => {
                res.json({ result:'Something Went Wrong!!'})
            })
        }
        else{
            
            const sendMessageObj = sendMessageService.sendMessageObj(req.body);
            sendMessageService.saveData(sendMessageObj)
            .then(data=>{
                res.json({result: 'Messaged Successfully'});
            })
            .catch(err => {
                console.log(err);
                res.json({ result:'Something Went Wrong!!'})
            })
        }
    })
}