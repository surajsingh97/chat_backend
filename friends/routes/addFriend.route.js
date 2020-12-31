const express=require('express');
const router=express.Router();
const addFriend=require('../controllers/addFriend')
const userController=require('../../user/controller/user.controller')

router.post('/Add',userController.verifyToken, addFriend.func);

module.exports=router;
