const mLista = require('../models/listaModel')
const mItems = require('../models/itemModel')

module.exports = {
    getLista: async (req, res) => {
        let items;
        if (req.query.id || req.query.nombre) {
            if (req.query.id) {
                    res.redirect(`/item/${req.query.id}`)
            }else{
                items = await mItems.getItemsByName(`%${req.query.nombre}%`);
                if (!(items.length >= 1)) {
                    res.render("itemInexistente", {auth: req.session.isAuth});
                }
                res.render("lista", {items: items, auth: req.session.isAuth});
            }
        }else{
            items = await mItems.getItems();
            res.render("lista", {items: items, auth: req.session.isAuth});
        }
    }
}