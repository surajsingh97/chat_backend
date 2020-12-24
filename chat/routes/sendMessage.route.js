const express=require('express');
const router=express.Router();
const sendMessage = require('../controllers/sendMessage');
const tokenService = require('../../user/controller/user.controller');

router.post('/user/send-message', sendMessage.sendMessage);

module.exports=router;