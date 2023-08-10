const itemController = {
    showItemList: function(req, res){
        res.send(`Mostrando lista de todos los items`);
    },

    showItem: function(req, res){
        res.send(`Enviando item ${req.params.id}`);
    },

}

module.exports = itemController;