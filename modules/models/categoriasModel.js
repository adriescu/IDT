const queryMySql = require('../../config/database');

exports.getCategorias = function(){
    return queryMySql("SELECT * FROM categorias",[])
}