const mongoose = require('mongoose');
const bcrypt =require('bcrypt')

const userSchema = mongoose.Schema({
    userName: {
        type: String,   
        required:true
    },
    email: {
        type: String,
        unique:true
           },
    password: {
        type: String,   
        required:true
    },
});

userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    console.log(salt,this.password);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})


module.exports = mongoose.model('users', userSchema);