const queryMySql = require('../../config/database');
const fs = require('fs')
const path = require('path')

exports.getItems = function(){
    return queryMySql("SELECT items.idItem, items.nombre, sectores.nombre AS sectorNombre, categorias.nombre AS categoriaNombre, items.fechaAdquisicion, items.imagen FROM ((items INNER JOIN sectores ON items.sector = sectores.idSector) INNER JOIN categorias ON items.categoria = categorias.idCategoria)",[])
}

// exports.getItemById = function(id){
//     return queryMySql("SELECT * FROM items WHERE idItem = ?",[id])
// }

exports.getItemById = function(id){
    return queryMySql("SELECT items.idItem, items.nombre, sectores.nombre AS nombreSector, sectores.idSector AS sector, categorias.nombre AS nombreCategoria, categorias.idCategoria AS categoria, items.fechaAdquisicion, items.imagen FROM ((items INNER JOIN sectores ON items.sector = sectores.idSector) INNER JOIN categorias ON items.categoria = categorias.idCategoria) WHERE items.idItem = ?",[id])
}

exports.crearItems = function(item){
    return queryMySql("INSERT INTO items (nombre, sector, categoria, fechaAdquisicion, imagen) VALUES (?, ?, ?, ?, ?)", [item.nombre, item.sector, item.categoria, item.fechaAdquisicion, item.imagen])
}

exports.borrarImagen = (img) => {
    let route = path.join(`${__dirname}`, `../../public/uploads/${img}`)
    console.log(route);
    fs.unlinkSync(route);
}

exports.update = (obj) => {
    let params = [obj.nombre , obj.sector , obj.categoria , obj.fechaAdquisicion , obj.imagen , obj.id];
    return queryMySql("UPDATE items SET nombre = ?, sector = ?, categoria = ?, fechaAdquisicion = ?, imagen = ? WHERE idItem = ?", params);
}