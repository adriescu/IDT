const mItem = require('../models/itemModel')
const mSectores = require('../models/areasSectoresModel')
const mCategorias = require('../models/categoriasModel')

module.exports = {
    getItem: (req, res) => {
        res.redirect("/lista");
    },

    getItemById: async (req, res) => {
        try{
            let resultado = await mItem.getItemById(req.params.id)
            if(!(resultado[0] == undefined)){
                res.render("item", {item: resultado[0]})
            }else{
                res.render("404");
            }
        }catch(error){
            res.send(`Hubo un error: ${error}`)
        }
    },

    getCrearItem: async (req, res) => {
        try {
            let sectores = await mSectores.getSectores();
            let categorias = await mCategorias.getCategorias();
            console.log(sectores);
            console.log(categorias);
            res.render("crearItem", {sectores, categorias})
        } catch (error) {
            console.log(error);
        }
    },

    postCrearItem: async (req, res) => {
        let item = req.body;
        try {
            let resultado = await mItem.crearItems({nombre: item.nombre,sector: item.sector,categoria: item.categoria,fechaAdquisicion: item.fechaAdquisicion})
            res.send({result:"success", error: null});
        } catch (error) {
            res.send({result:"error", error: error});
        }
    }
}