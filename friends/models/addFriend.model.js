const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    }, 
   
    friends : {
        type: [ { friendId : {type: String, default: '', unique: false},userName : String ,} ],
        default: undefined
    },
});

module.exports = mongoose.model('Friends', friendSchema);