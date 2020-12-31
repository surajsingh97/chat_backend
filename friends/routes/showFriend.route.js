const express=require('express');
const router=express.Router();
const showFriend=require('../controllers/showFriend')
const userController=require('../../user/controller/user.controller')

router.post('/show-friend',userController.verifyToken, showFriend.getFriends);

module.exports=router;
