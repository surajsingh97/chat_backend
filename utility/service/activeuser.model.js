const mongoose = require('mongoose');

const activeuserSchema = mongoose.Schema({
    userName: {
        type: String,   
        required:true,
        unique: true

    },
});

module.exports = mongoose.model('activeuser', activeuserSchema);