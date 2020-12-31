const express=require('express');
const router=express.Router();
const deleteFriend=require('../controllers/deleteFriend')
const userController=require('../../user/controller/user.controller')

router.post('/user/delete-friend', userController.verifyToken, deleteFriend.delete);

module.exports=router;


