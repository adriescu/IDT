const { query } = require('express');
const queryMySql = require('../../config/database');

exports.getAreas = function(){
    return queryMySql("SELECT * FROM areas",[])
}

exports.getAreaById = function(id){
    return queryMySql("SELECT * FROM areas WHERE idArea = ?",[id])
}

exports.eliminarArea = function(id){
    return queryMySql("DELETE FROM areas WHERE idArea = ?", [id])
}

exports.crearArea = function(obj){
    return queryMySql("INSERT INTO areas (nombre, descripcion) VALUES (?,?)", [obj.nombre,obj.descripcion])
}

exports.editarArea = function(obj){
    return queryMySql("UPDATE areas SET nombre = ?, descripcion = ? WHERE idArea = ?", [obj.nombre, obj.descripcion, obj.idArea])
}