module.exports = {
    getIndex: (req, res) => {
        console.log(req.session.isAuth);
        res.render("index", {auth: req.session.isAuth})
    }
}