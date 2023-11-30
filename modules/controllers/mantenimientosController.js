const mItem = require("../models/itemModel")
const mMantenimientos = require("../models/mantenimientosModel")

module.exports = {
    getMantenimientos: async (req, res) => {
        let item = await mItem.getItemById(req.params.id)
        console.log(item);
        let mantenimientos = await mMantenimientos.getMantenimientosByItemId(item[0].idItem);
        console.log(mantenimientos);
        res.render("mantenimientos", {item: item, mantenimientos: mantenimientos, auth: req.session.isAuth})
    },

    getCrearMantenimiento: (req, res) => {
        res.render("crearMantenimiento", {id: req.params.id, auth: req.session.isAuth})
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
    },

    getEditarMantenimiento: async (req, res) => {
        try {
            let mantenimiento = await mMantenimientos.getMantenimientoById(req.params.id)
            console.log(mantenimiento);
            res.render("editarMantenimiento", {mantenimiento: mantenimiento[0], auth: req.session.isAuth})
        } catch (error) {
            res.render("error", {error: error, auth: req.session.isAuth})
        }
    },

    postEditarMantenimiento: async (req, res) => {
        try {
            let obj = {
                idMantenimiento: req.params.id,
                fecha: req.body.fecha,
                responsable: req.body.responsable,
                realizadoPor: req.body.realizadoPor,
                descripcion: req.body.descripcion,
                observaciones: req.body.observaciones,
            }
            await mMantenimientos.editarMantenimiento(obj)
            res.send({result: "success", error: null});
        } catch (error) {
            res.send({result: "error", error: error});
        }
    },

    postEliminarMantenimiento: async (req, res) => {
        try {
            await mMantenimientos.eliminarMantenimiento(req.params.id)
            res.send({result: "success", error: null});
        } catch (error) {
            res.send({result: "error", error: error});
        }
    }
}