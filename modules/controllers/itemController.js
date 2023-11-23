const mItem = require('../models/itemModel')
const mSectores = require('../models/areasSectoresModel')
const mCategorias = require('../models/categoriasModel')
const mMant = require('../models/mantenimientosModel')
module.exports = {
    getItem: (req, res) => {
        res.redirect("/lista");
    },

    getItemById: async (req, res) => {
        try{
            let resultado = await mItem.getItemById(req.params.id)
            let mantenimientos = await mMant.getMantenimientosByItemId(req.params.id);
            if (mantenimientos == false) {
                mantenimientos = [{fecha: null}]
            }
            console.log(mantenimientos);
            if(!(resultado[0] == undefined)){
                res.render("item", {item: resultado[0], mantenimientos: mantenimientos, auth: req.session.isAuth})
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
        // let item = req.body;
        // try {
        //     let resultado = await mItem.crearItems({nombre: item.nombre,sector: item.sector,categoria: item.categoria,fechaAdquisicion: item.fechaAdquisicion, imagen: imagen})
        //     res.send({result:"success", error: null});
        // } catch (error) {
        //     res.send({result:"error", error: error});
        // }

        let item = req.body;
        let nombreDeFoto;
        if (!req.file) {
            nombreDeFoto = null
        }else{
            nombreDeFoto = req.file.filename;
        }

        try {
            await mItem.crearItems({nombre: item.nombre,sector: item.sector,categoria: item.categoria,fechaAdquisicion: item.fechaAdquisicion, imagen: nombreDeFoto})
            res.send({
                type: "success",
                title: "Datos cargados coorrectamente 👌",
                text: "",
                error: null
            })
        } catch (error) {
            res.send({
                type: "error",
                title: "Hubo un error al cargar los datos",
                text: error.message,
                error: error
            })
        }

    },

    getEditarItem: async (req, res)=>{
        try {
            let item = await mItem.getItemById(req.params.id)
            let sectores = await mSectores.getSectores()
            let categorias = await mCategorias.getCategorias()
            console.log(item);
            res.render("editarItem", {item: item[0], sectores: sectores, categorias: categorias})
        } catch (error) {
            console.log(error)
            res.redirect("/")
        }
    },
    postEditarItem: async (req, res)=>{
        console.log(req.body);
        try {
            let imagen;
            if(req.file == undefined){
                if(req.body.imagen == "null"){
                    if(req.body.imagenAnterior){
                        mItem.borrarImagen(req.body.imagenAnterior)
                    }
                    imagen = ""
                }else{
                    if(req.body.imagen == ""){
                        imagen = ""
                    }else{
                        imagen = req.body.imagen
                    }
                }
            }else{
                imagen = req.file.filename
                if (req.body.imagenAnterior != "") {
                    mItem.borrarImagen(req.body.imagenAnterior)
                }
            }
    
            let obj = {
                nombre: req.body.nombre,
                sector: req.body.sector,
                categoria: req.body.categoria,
                fechaAdquisicion: req.body.fechaAdquisicion,
                id: req.body.id,
                imagen: imagen
            }
            await mItem.update(obj);
            res.send({
                type: "success",
                title: "Datos modificados correctamente 👌",
                text: "",
            });
        } catch (error) {
            res.send({
                type: "error",
                title: "Hubo un error!!",
                text: error.message,
            });
        }
    }
}