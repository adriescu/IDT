const express = require('express')
const router = express.Router()
const path = require('path')

cIndex = require('./modules/controllers/indexController')
cItem = require('./modules/controllers/itemController')
cList = require('./modules/controllers/listController')
cLogin = require('./modules/controllers/loginController')

router.get('/login', cLogin.getLogin)
router.post('/login', cLogin.postLogin)



router.get('/list', cList)




module.exports = router