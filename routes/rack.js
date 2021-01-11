const express = require('express')
const router = express.Router()
const { getRack } = require('../controllers/rackController')

router.get('/', getRack)

module.exports = router

