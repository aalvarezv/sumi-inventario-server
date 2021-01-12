const express = require('express')
const router = express.Router()
const { registrarProducto, getProducto, getProductos } = require('../controllers/productoController')

router.post('/registrar', registrarProducto)
router.get('/', getProducto)
router.get('/todos', getProductos)

module.exports = router

