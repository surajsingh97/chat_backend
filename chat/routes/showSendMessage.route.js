const express=require('express');
const router=express.Router();
const sendMessage = require('../controllers/showSendMessage');
const tokenService = require('../../user/controller/user.controller');

router.post('/show-messages',  sendMessage.showMessages);

module.exports=router;