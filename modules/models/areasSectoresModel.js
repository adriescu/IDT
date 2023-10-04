const { query } = require('express');
const queryMySql = require('../../config/database');

exports.getAreas = function(){
    return queryMySql("SELECT * FROM areas",[])
}

exports.eliminarArea = function(id){
    return queryMySql("DELETE FROM areas WHERE idArea = ?", [id])
}

exports.crearArea = function(obj){
    return queryMySql("INSERT INTO areas (nombre, descripcion) VALUES (?,?)", [obj.nombre,obj.descripcion])
}