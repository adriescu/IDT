const mAreasSectores = require('../models/areasSectoresModel')

module.exports = {
    getAreas: async (req, res) => {
        try {
            let resultados = await mAreasSectores.getAreas();
            res.render("areas",{areas: resultados, err: false})
        } catch (error) {
            res.render("area",{err: error})
        }
    },

    getSectores: (req, res) => {
        res.render("sectores",{})
    },

    postEliminarArea: async (req, res) => {
        try {
            await mAreasSectores.eliminarArea(req.params.id)
            res.send({
                result: "success"
            })
        } catch (error) {
            res.send({
                result: "error",
                error 
            })
        }
    },

    getCrearArea: (req, res) => {
        res.render("crearArea",{});
    },

    postCrearArea: async (req, res) => {
        try {
            await mAreasSectores.crearArea(req.body)
            res.send({result: "success", error: null})
        } catch (error) {
            res.send({result: "error", error})
        }
    }
}