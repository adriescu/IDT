const express = require('express')
const router = express.Router()
const path = require('path')

cIndex = require('./modules/controllers/indexController')
cItem = require('./modules/controllers/itemController')
cList = require('./modules/controllers/listController')
cLogin = require('./modules/controllers/loginController')

router.get('/', cIndex.getIndex)

router.get('/login', cLogin.getLogin)
router.post('/login', cLogin.postLogin)

router.get('/item', cItem.getItem)
router.get('/item/:id', cItem.getItemById)

router.get('/list', cList.getList)

router.use((req, res) => {
    res.render("404")
})



module.exports = router