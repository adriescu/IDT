const queryMySql = require('../../config/database');

exports.getItems = function(){
    return queryMySql("SELECT * FROM items",[])
}

exports.getItemById = function(id){
    return queryMySql("SELECT * FROM items WHERE id = ?",[id])
}