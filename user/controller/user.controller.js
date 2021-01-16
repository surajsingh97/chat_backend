const User = require('../model/user.model');
const tokenService = require('../../utility/service/tokenservice');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

exports.verifyToken=(req,res,next)=>  {
    //get bearer-header vald
    const bearerHeader = req.headers.authorization;
    //check bearer-header is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;

        //Next middleware
        next();
    } else {
        //Forbidden
        res.send({ msg: '403-forbidden error' })
    }

}

exports.createUser =  (req,res)=>{
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
    User.findOne({userName:userData.email},(error,user)=>{
        if(error){
        }else{
            if(!user){
                res.status(400).send({
                    message:'Invalid Username',
                })
            }else{
                bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                    if (!isMatch) {
                        res.status(400).send({
                            message:'Invalid Password'
                        })
                    }
                    else {
                        const tok=tokenService.createToken(user);
                        const payload=jwt.verify(tok, 'secret_key');
                        const userName=payload.id.userName;
                        res.send({tok,userName});
                    }
                    })
            }
        }
    })
}
