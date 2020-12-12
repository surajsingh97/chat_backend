const user = require('../model/user.model');

exports.userObj=(payload,hash)=>{
    try
    {
        return new user({
            userName: payload.userName || "No user's userName",
            password: hash || "No User's password",
            email: payload.email || "No user's email",
        });
    }
    catch(error)
    {
        throw error
    }
}

exports.saveData=(user)=>{
    try
    {
        return user.save();
    }
    catch(error)
    {
        throw error
    }
}
