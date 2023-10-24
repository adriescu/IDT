const mLista = require('../models/listaModel')
const mItems = require('../models/itemModel')

module.exports = {
    getLista: async (req, res) => {
        let items = await mItems.getItems();
        res.render("lista", {items: items});
    }
}