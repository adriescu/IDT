const mLogin = require('../models/loginModel')

module.exports = {
    getLogin: (req, res) => {
        res.render('login', {mensaje: "", auth: req.session.isAuth})
    },
    postLogin: async (req, res) => {
        if(req.session.isAuth){
            res.send(":)")
        }
        let respuesta = await mLogin.getUserByEmail(req.body.email);
        console.log(respuesta);
        if(!respuesta[0]){
            res.render('login', {mensaje: "El email ingresado no existe", auth: req.session.isAuth})
        }else{
            if(req.body.password == respuesta[0].password){
                req.session.isAuth = true;
                res.render('index', {auth: req.session.isAuth})
            }else{
                res.render('login', {mensaje: "La contraseña ingresada no es correcta", auth: req.session.isAuth})
            }
        }
    },
}