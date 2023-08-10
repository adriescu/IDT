const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', (req, res)=>{
    setTimeout(()=>{
        res.redirect('../list')
    },3000)
});

router.get('/:id', itemController.showItem);

module.exports = router;