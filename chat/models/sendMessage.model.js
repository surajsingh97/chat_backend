const mongoose = require('mongoose');

const sendMessageSchema = mongoose.Schema({
    friendId: {
        type: String,
        unique: true,
        required: true
    },
    chats: {
        type: [
            {
                message: { type: String, required: true},
                createdOn: { type: String, required: true},
                senderId: { type: String, required: true},
                receiverId:{ type: String, required: true}
            }
        ],
        default: undefined
    }
})

module.exports = mongoose.model('SendMessages', sendMessageSchema);