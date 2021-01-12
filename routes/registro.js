const express = require('express')
const router = express.Router()
const { getRegistros } = require('../controllers/registroController')

router.get('/', getRegistros)

module.exports = router

