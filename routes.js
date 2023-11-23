const express = require('express')
const router = express.Router()
const path = require('path')

const cIndex = require('./modules/controllers/indexController')
const cItem = require('./modules/controllers/itemController')
const cList = require('./modules/controllers/listaController')
const cLogin = require('./modules/controllers/loginController')
const cMantenimientos = require('./modules/controllers/mantenimientosController')
const cAreasSectores = require('./modules/controllers/areasSectoresController')
const cAuth = require("./modules/controllers/authController")
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, './public/uploads'),
    filename: function(req, file, cb){
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage
}).single('imagen')


router.get('/',cIndex.getIndex)

router.get('/login', cLogin.getLogin)
router.post('/login', cLogin.postLogin)

router.get('/cerrarSesion', cAuth.cerrarSesion)

router.get('/item/crear', cAuth.isAuth, cItem.getCrearItem)
router.post('/item/crear', cAuth.isAuth, upload, cItem.postCrearItem)
router.get('/item/:id', cItem.getItemById)
router.get('/item/editar/:id', cAuth.isAuth, cItem.getEditarItem)
router.post('/item/editar/:id', cAuth.isAuth, upload, cItem.postEditarItem)
router.get('/item', cItem.getItem)

router.get('/lista', cList.getLista)

router.get('/areas', cAuth.isAuth, cAreasSectores.getAreas)
router.post('/areas/eliminar/:id', cAuth.isAuth, cAreasSectores.postEliminarArea)
router.get('/areas/crear', cAuth.isAuth, cAreasSectores.getCrearArea)
router.post('/areas/crear', cAuth.isAuth, cAreasSectores.postCrearArea)
router.get('/areas/editar/:id', cAuth.isAuth, cAreasSectores.getEditarArea)
router.post('/areas/editar/:id', cAuth.isAuth, cAreasSectores.postEditarArea)

router.get('/sectores', cAuth.isAuth, cAreasSectores.getSectores)
router.get('/sectores/crear', cAuth.isAuth, cAreasSectores.getCrearSector)
router.get('/sectores/editar/:id', cAuth.isAuth, cAreasSectores.getEditarSector)
router.post('/sectores/editar/:id', cAuth.isAuth, cAreasSectores.postEditarSector)

router.get('/mantenimientos/crear/:id', cAuth.isAuth, cMantenimientos.getCrearMantenimiento)
router.get('/mantenimientos/:id', cMantenimientos.getMantenimientos)
router.post('/mantenimientos/crear/:id', cAuth.isAuth, cMantenimientos.postCrearMantenimiento)

router.use((req, res) => {
    res.render("404")
})

module.exports = router