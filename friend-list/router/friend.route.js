const express=require('express');
const router=express.Router();
const friendController=require('../controller/friend.controller')
const userController=require('../../user/controller/user.controller')

router.post('/Add',userController.verifyToken,friendController.func);
router.post('/getFriend',userController.verifyToken,friendController.getFriend);

module.exports=router;