const user = require('../../user/model/user.model');


exports.findUser = (userName)=>{
    try{
        return user.findOne({userName:userName});

    }catch(err){
        console.log(err);
    }
}