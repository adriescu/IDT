const queryMySql = require('../../config/database');

exports.getItemById = function(id){
    return queryMySql("SELECT * FROM items WHERE id = ?",[id])
}