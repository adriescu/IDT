const queryMySql = require('../../config/database');

exports.getItems = function(){
    return queryMySql("SELECT items.idItem, items.nombre, sectores.nombre AS sectorNombre, categorias.nombre AS categoriaNombre, items.fechaAdquisicion FROM ((items INNER JOIN sectores ON items.sector = sectores.idSector) INNER JOIN categorias ON items.categoria = categorias.idCategoria)",[])
}

exports.getItemById = function(id){
    return queryMySql("SELECT * FROM items WHERE idItem = ?",[id])
}