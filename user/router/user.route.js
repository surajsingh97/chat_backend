const express=require('express');
const router=express.Router();
const postcontrol=require('../controller/user.controller')

router.post('/signup',postcontrol.createUser);
router.post('/login',postcontrol.loginUser);

module.exports=router;