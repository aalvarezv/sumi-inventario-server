const express = require('express')
const router = express.Router()
const { registrarProducto, getProducto } = require('../controllers/productoController')

router.post('/registrar', registrarProducto)
router.get('/', getProducto)

module.exports = router

