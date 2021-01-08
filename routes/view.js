const express = require('express')
const router = express.Router()
const { getMonitorStatus } = require('../controllers/viewMonitorController')

router.get('/monitor/status', getMonitorStatus)

module.exports = router

