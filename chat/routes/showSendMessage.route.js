const showSendMessage = require('../controllers/showSendMessage');
const tokenService = require('../../user/controller/user.controller');

module.exports = (app)=>{
    return app.post('/user/show-messages', tokenService.verifyToken, showSendMessage);
}