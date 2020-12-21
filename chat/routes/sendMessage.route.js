const sendMessage = require('../controllers/sendMessage');
const tokenService = require('../../user/controller/user.controller');

module.exports = (app)=>{
    return app.post('/user/send-message', tokenService.verifyToken, sendMessage);
}