const mLogin = require('../models/loginModel')

module.exports = {
    getLogin: (req, res) => {
        res.render('login', {mensaje: ""})
    },
    postLogin: async (req, res) => {
        let respuesta = await mLogin.getUserByEmail(req.body.email);
        console.log(respuesta);
        if(!respuesta[0]){
            res.render('login', {mensaje: "El email ingresado no existe"})
        }else{
            if(req.body.password == respuesta[0].password){
                req.session.isAuth = true;
                res.render('index', {})
            }else{
                res.render('login', {mensaje: "La contraseña ingresada no es correcta"})
            }
        }
    },
}