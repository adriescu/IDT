const express = require('express')
const router = express.Router()
const path = require('path')

const cIndex = require('./modules/controllers/indexController')
const cItem = require('./modules/controllers/itemController')
const cList = require('./modules/controllers/listaController')
const cLogin = require('./modules/controllers/loginController')
const cMantenimientos = require('./modules/controllers/mantenimientosController')
const cAreasSectores = require('./modules/controllers/areasSectoresController')


router.get('/', cIndex.getIndex)

router.get('/login', cLogin.getLogin)
router.post('/login', cLogin.postLogin)

router.get('/item/crear', cItem.getCrearItem)
router.post('/item/crear', cItem.postCrearItem)
router.get('/item/:id', cItem.getItemById)
router.get('/item', cItem.getItem)

router.get('/lista', cList.getLista)

router.get('/areas', cAreasSectores.getAreas)
router.post('/areas/eliminar/:id', cAreasSectores.postEliminarArea)
router.get('/areas/crear', cAreasSectores.getCrearArea)
router.post('/areas/crear', cAreasSectores.postCrearArea)
router.get('/areas/editar/:id', cAreasSectores.getEditarArea)
router.post('/areas/editar/:id', cAreasSectores.postEditarArea)

router.get('/sectores', cAreasSectores.getSectores)
router.get('/sectores/editar/:id', cAreasSectores.getEditarSector)
router.post('/sectores/editar/:id', cAreasSectores.postEditarSector)

router.get('/mantenimientos/crear', cMantenimientos.getCrearMantenimiento)
router.get('/mantenimientos/:id', cMantenimientos.getMantenimientos)
router.post('/mantenimientos/crear/:id', cMantenimientos.postCrearMantenimiento)

router.use((req, res) => {
    res.render("404")
})

module.exports = router