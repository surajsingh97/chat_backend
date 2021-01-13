const friendService = require('../services/show.service');
const message = require('../../chat/models/sendMessage.model')

exports.getFriends = (req, res)=> {
    const arr=[];
    friendService.showFriendList(req.body.userId)
    .then(data=> {
       
        data.friends.forEach((element ,i)=> {
            message.findOne({friendId:element.friendId}).then(chatData=>{
                console.log("all chatdata",chatData)
                const latestMessage = chatData.chats.length> 0 ? chatData.chats[chatData.chats.length-1]: {};4
                console.log("latest",latestMessage);
                console.log(i);
                data.friends[i]['latestMessage'] = latestMessage;
                console.log("all list",friendList)
            })
        });
        res.json({result:data})
    })
    .catch(err=> {
        res.json({result: 'Something Went Wrong!!'})
    })
}

//  console.log(data);
//         const friendList = data.friends;
//         data.friends.forEach((element, i) => {
//             message.find({friendId:element.friendId}).then(chatData=>{
//                 console.log(chatData)
//                 const latestMessage = chatData.chats.length> 0 ? chatData.chats[chatData.chats.length-1]: {};
//                 friendList[i]['latestMessage'] = latestMessage;
//                 console.log(friendList);
//             })
//         });