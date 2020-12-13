const mongoose = require('mongoose');


const friendSchema = mongoose.Schema({
    userId: {
        type: String,   
        required: true,
        unique: true
    },
    friends: {
        type: [ { friendId : {type: String, default: '', unique: false} } ],
        default: undefined
    }
});

module.exports = mongoose.model('friends', friendSchema);