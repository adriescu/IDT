const { query } = require('express');
const queryMySql = require('../../config/database');

exports.getAreas = function(){
    return queryMySql("SELECT * FROM areas",[])
}

exports.getSectores = function(){
    return queryMySql("SELECT sectores.idSector, sectores.nombre, sectores.descripcion, areas.nombre AS nombreArea FROM sectores INNER JOIN areas ON sectores.idArea = areas.idArea",[])
}

exports.getAreaById = function(id){
    return queryMySql("SELECT * FROM areas WHERE idArea = ?",[id])
}

exports.getSectorById = function(id){
    return queryMySql("SELECT * FROM sectores WHERE idSector = ?",[id])
}

exports.eliminarArea = function(id){
    return queryMySql("DELETE FROM areas WHERE idArea = ?", [id])
}

exports.eliminarSector = function(id){
    return queryMySql("DELETE FROM sectores WHERE idSector = ?", [id])
}

exports.crearArea = function(obj){
    return queryMySql("INSERT INTO areas (nombre, descripcion) VALUES (?,?)", [obj.nombre,obj.descripcion])
}

exports.crearSector = function(obj){
    return queryMySql("INSERT INTO sectores (nombre, descripcion, idArea) VALUES (?,?,?)", [obj.nombre,obj.descripcion,obj.idArea])
}

exports.editarArea = function(obj){
    return queryMySql("UPDATE areas SET nombre = ?, descripcion = ? WHERE idArea = ?", [obj.nombre, obj.descripcion, obj.idArea])
}

exports.editarSector = function(obj){
    return queryMySql("UPDATE sectores SET nombre = ?, descripcion = ?, idArea = ? WHERE idSector = ?", [obj.nombre, obj.descripcion, obj.idArea, obj.idSector])
}