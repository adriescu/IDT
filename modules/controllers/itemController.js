const mItem = require('../models/itemModel')

module.exports = {
    getItem: (req, res) => {
        res.redirect("/list");
    },
    getItemById: async (req, res) => {
        try{
            let resultado = await mItem.getItemById(req.params.id)
            if(!(resultado == [])){
                res.render("item", {item: resultado[0]})
            }else{
                res.render("404");
            }
        }catch(error){
            res.send(`Hubo un error: ${error}`)
        }
    }
}