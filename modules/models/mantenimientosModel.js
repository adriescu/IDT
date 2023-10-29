const queryMySql = require("../../config/database")

exports.crearMantenimiento = function(m) {
    return queryMySql("INSERT INTO mantenimientos (idItem, fecha, responsable, realizadoPor, descripcion, observaciones) VALUES (?,?,?,?,?,?)",[m.idItem, m.fecha, m.responsable, m.realizadoPor, m.descripcion, m.observaciones])
}

exports.getMantenimientosByItemId = function(id) {
    return queryMySql("SELECT * FROM mantenimientos WHERE mantenimientos.idItem")
}