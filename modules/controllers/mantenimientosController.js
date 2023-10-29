const mItem = require("../models/itemModel")
const mMantenimientos = require("../models/mantenimientosModel")

module.exports = {
    getMantenimientos: async (req, res) => {
        let item = await mItem.getItemById(req.params.id)
        let mantenimientos = await mMantenimientos.getMantenimientosByItemId();
        res.render("mantenimientos", {item: item, mantenimientos: mantenimientos})
    },

    getCrearMantenimiento: (req, res) => {
        res.render("crearMantenimiento", {id: req.params.id})
    },

    postCrearMantenimiento: async (req, res) => {
        try {
            let m = {
                idItem: req.params.id,
                fecha: req.body.fecha,
                responsable: req.body.responsable,
                realizadoPor: req.body.realizadoPor,
                descripcion: req.body.descripcion,
                observaciones: req.body.observaciones,
            }
            let resultado = await mMantenimientos.crearMantenimiento(m);
            res.send({result: "success", error: null});
            console.log("success");
        } catch (error) {
            res.send({result: "error", error: error})
            console.log("error", error);
        }
    }
}