const express = require('express')
const router = express.Router()
const path = require('path')

const cIndex = require('./modules/controllers/indexController')
const cItem = require('./modules/controllers/itemController')
const cList = require('./modules/controllers/listController')
const cLogin = require('./modules/controllers/loginController')
const cMantenimientos = require('./modules/controllers/mantenimientosController')

router.get('/', cIndex.getIndex)

router.get('/login', cLogin.getLogin)
router.post('/login', cLogin.postLogin)

router.get('/item', cItem.getItem)
router.get('/item/:id', cItem.getItemById)

router.get('/list', cList.getList)

router.get('/mantenimientos/:id', cMantenimientos.getMantenimientos)

router.use((req, res) => {
    res.render("404")
})



module.exports = router