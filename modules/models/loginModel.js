const queryMySql = require('../../config/database');

exports.getUserByEmail = function(email){
    return queryMySql("SELECT * FROM usuarios WHERE correo = ?",[email])
}