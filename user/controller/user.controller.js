const User = require('../model/user.model');
const tokenService = require('../../utility/service/tokenservice');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req,res)=>{
    userObj=req.body;
    try{
    const user = User.create(userObj);
    res.send(user);
    }catch(err){
        res.send(err);
    }
}

exports.loginUser = (req,res)=>{
    let userData=req.body;
    console.log(userData);  
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(400).send({
                    message:'Invalid Email',
                })
            }else{
                console.log(user.password,"t")
                bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                    if (!isMatch) {
                        res.status(400).send({
                            message:'Invalid Password'
                        })
                    }
                    else {
                        const tok=tokenService.createToken(user._id);
                        const payload=jwt.verify(tok, 'secret_key');
                        const userName=payload.userName;
                        console.log(tok);
                        res.send({tok,userName});
                    }
        
                    })
            }
        }
    })
}