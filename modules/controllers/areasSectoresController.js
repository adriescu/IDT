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

    getSectores: async (req, res) => {
        try {
            let sectores = await mAreasSectores.getSectores();
            res.render("sectores",{sectores: sectores, err: false})
        } catch (error) {
            res.render("sectores",{err: error})
        }
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

    postEliminarSector: async (req, res) => {
        try {
            await mAreasSectores.eliminarSector(req.params.id)
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

    getCrearSector: async (req, res) => {
        let areas = await mAreasSectores.getAreas();
        res.render("crearSector",{ areas: areas });
    },

    postCrearArea: async (req, res) => {
        try {
            await mAreasSectores.crearArea(req.body)
            res.send({result: "success", error: null})
        } catch (error) {
            res.send({result: "error", error})
        }
    },

    postCrearSector: async (req, res) => {
        try {
            await mAreasSectores.crearSector(req.body)
            res.send({result: "success", error: null})
        } catch (error) {
            res.send({result: "error", error})
        }
    },

    getEditarArea: async (req, res) => {
        try {
            let id = req.params.id
            let area = await mAreasSectores.getAreaById(id)
            res.render("editarArea", {area: area[0] ,error: null})
        } catch (error) {
            res.render("editarArea", {areas: "",error})
        }
    },

    getEditarSector: async (req, res) => {
        try {
            let id = req.params.id
            let sector = await mAreasSectores.getSectorById(id);
            let areas = await mAreasSectores.getAreas();
            res.render("editarSector", {sector: sector[0], areas: areas,error: null})
        } catch (error) {
            res.render("editarSector", {sector: "",error})
            console.log(error);
        }
    },

    postEditarArea: async (req, res) => {
        try {
            let obj = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                idArea: req.params.id,
            }
            await mAreasSectores.editarArea(obj)
            res.send({
                result: "success",
                error: null
            })
        } catch (error) {
            res.send({
                result: "success",
                error
            })
        }
        
    },
    postEditarSector: async (req, res) => {
        try {
            let obj = {
                idArea: req.body.idArea,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                idSector: req.params.id,
            }
            await mAreasSectores.editarSector(obj)
            res.send({
                result: "success",
                error: null
            })
        } catch (error) {
            res.send({
                result: "success",
                error
            })
        }
        
    }
}