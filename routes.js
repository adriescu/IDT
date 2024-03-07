const express = require('express')
const router = express.Router()
const path = require('path')

// Todos los archivos controladores
const cIndex = require('./modules/controllers/indexController')
const cItem = require('./modules/controllers/itemController')
const cList = require('./modules/controllers/listaController')
const cLogin = require('./modules/controllers/loginController')
const cMantenimientos = require('./modules/controllers/mantenimientosController')
const cAreasSectores = require('./modules/controllers/areasSectoresController')
const cAuth = require("./modules/controllers/authController")
const { v4: uuidv4 } = require('uuid') // Librería para generar números de id unicos (para los nombres de las imágenes)
const multer = require('multer')

// Configuración de multer para guardar las imágenes
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, './public/uploads'),
    filename: function(req, file, cb){
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage
}).single('imagen')

//Todas las rutas y que función llama cada una
router.get('/', cIndex.getIndex)

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
router.post('/sectores/crear', cAuth.isAuth, cAreasSectores.postCrearSector)
router.get('/sectores/editar/:id', cAuth.isAuth, cAreasSectores.getEditarSector)
router.post('/sectores/editar/:id', cAuth.isAuth, cAreasSectores.postEditarSector)
router.post('/sectores/eliminar/:id', cAuth.isAuth, cAreasSectores.postEliminarSector)

router.get('/mantenimientos/crear/:id', cAuth.isAuth, cMantenimientos.getCrearMantenimiento)
router.get('/mantenimientos/:id', cMantenimientos.getMantenimientos)
router.post('/mantenimientos/crear/:id', cAuth.isAuth, cMantenimientos.postCrearMantenimiento)
router.get('/mantenimientos/editar/:id', cAuth.isAuth, cMantenimientos.getEditarMantenimiento)
router.post('/mantenimientos/editar/:id', cAuth.isAuth, cMantenimientos.postEditarMantenimiento)
router.post('/mantenimientos/eliminar/:id', cAuth.isAuth, cMantenimientos.postEliminarMantenimiento)


// Si la ruta no existe mostrar la vista "404"
router.use((req, res) => {
    res.render("404", {auth: req.session.isAuth})
})

module.exports = router