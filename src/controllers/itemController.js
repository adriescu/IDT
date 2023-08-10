const itemController = {
    showItem: function(req, res){
        res.send(`Enviando item ${req.params.id}`);
    },

}

module.exports = itemController;