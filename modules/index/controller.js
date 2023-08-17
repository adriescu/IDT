const express = require('express')

exports.getIndex = (req, res) => {
    res.render('./index/views/index', {pagename: "Bienvenido"})
}