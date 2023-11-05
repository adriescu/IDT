
module.exports = {
    isAuth: (req, res, next) => {
        if (req.session.isAuth){
            next();
        }else{
            res.redirect("/login");
        }
    },
    cerrarSesion: (req, res, next) => {
        req.session.destroy();
        res.send("Sesión cerrada")
    }
}