const jwt = require('jsonwebtoken');

exports.createToken=(id)=>{
    return jwt.sign({ id }, 'secret_key');
}