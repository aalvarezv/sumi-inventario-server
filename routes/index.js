const express = require('express')
const app = express()
 
app.use('/api/auth/', require('./auth'))
app.use('/api/rack/', require('./rack'))
app.use('/api/producto/', require('./producto'))
app.use('/api/registros/', require('./registro'))

module.exports = app