const queryMySql = require("../../config/database")

exports.crearMantenimiento = function(m) {
    return queryMySql("INSERT INTO mantenimientos (idItem, fecha, responsable, realizadoPor, descripcion, observaciones) VALUES (?,?,?,?,?,?)",[m.idItem, m.fecha, m.responsable, m.realizadoPor, m.descripcion, m.observaciones])
}

exports.getMantenimientosByItemId = function(id) {
    return queryMySql("SELECT * FROM mantenimientos WHERE mantenimientos.idItem = ?",[id])
}

exports.getMantenimientoById = function(id) {
    return queryMySql("SELECT * FROM mantenimientos WHERE mantenimientos.idMantenimiento = ?",[id])
}

exports.editarMantenimiento = function(obj){
    return queryMySql("UPDATE mantenimientos SET fecha = ?, responsable = ?, realizadoPor = ?, descripcion = ?, observaciones = ? WHERE idMantenimiento = ?", [obj.fecha, obj.responsable, obj.realizadoPor, obj.descripcion, obj.observaciones, obj.idMantenimiento])
}

exports.eliminarMantenimiento = function(id){
    return queryMySql("DELETE FROM mantenimientos WHERE idMantenimiento = ?", [id])
}