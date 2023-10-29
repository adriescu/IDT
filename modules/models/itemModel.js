const queryMySql = require('../../config/database');

exports.getItems = function(){
    return queryMySql("SELECT items.idItem, items.nombre, sectores.nombre AS sectorNombre, categorias.nombre AS categoriaNombre, items.fechaAdquisicion FROM ((items INNER JOIN sectores ON items.sector = sectores.idSector) INNER JOIN categorias ON items.categoria = categorias.idCategoria)",[])
}

// exports.getItemById = function(id){
//     return queryMySql("SELECT * FROM items WHERE idItem = ?",[id])
// }

exports.getItemById = function(id){
    return queryMySql("SELECT items.idItem, items.nombre, sectores.nombre AS nombreSector, categorias.nombre AS nombreCategoria, items.fechaAdquisicion FROM ((items INNER JOIN sectores ON items.sector = sectores.idSector) INNER JOIN categorias ON items.categoria = categorias.idCategoria) WHERE items.idItem = ?",[id])
}

exports.crearItems = function(item){
    return  queryMySql("INSERT INTO items (nombre, sector, categoria, fechaAdquisicion) VALUES (?, ?, ?, ?)", [item.nombre, item.sector, item.categoria, item.fechaAdquisicion])
}