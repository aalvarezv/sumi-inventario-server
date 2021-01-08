const express = require('express')
const router = express.Router()
const { getRack } = require('../controllers/rackController')

router.get('/:codigo/:codigo_usuario', getRack)

module.exports = router

