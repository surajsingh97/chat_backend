const sendMessageService = require('../services/sendMessage.service');

exports.sendMessage = (req)=> {
    console.log(req.body);
    sendMessageService.findSendMessageDataByFriendId(req.friendId)
    .then(data=> {
        if(data){

            sendMessageService.findAndupdateSendMessageData(req)
            .then(data=>{
                console.log({result: 'Messaged Successfully'});
            })
            .catch(err => {
                console.log({ result:'Something Went Wrong!!'})
            })
        }
        else{
            
            const sendMessageObj = sendMessageService.sendMessageObj(req);
            sendMessageService.saveData(sendMessageObj)
            .then(data=>{
                console.log({result: 'Messaged Successfully'});
            })
            .catch(err => {
                console.log(err);
                console.log({ result:'Something Went Wrong!!'})
            })
        }
    })
}