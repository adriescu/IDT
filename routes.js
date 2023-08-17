const express = require('express')
const router = express.Router()
const path = require('path')

cIndex = require('./modules/index/controller')
cItem = require('./modules/item/controller')
cList = require('./modules/list/controller')

router.get('/', cIndex.getIndex)


router.get('/item/:id', cItem)


router.get('/item/:id/mantenimiento', cItem)


router.get('/list', cList)




module.exports = router