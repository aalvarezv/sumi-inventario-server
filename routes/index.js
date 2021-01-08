const express = require('express')
const app = express()
 
app.use('/api/auth/', require('./auth'))
app.use('/api/rack/', require('./rack'))
app.use('/api/producto/', require('./producto'))

//vista handlebars
app.use('/view/', require('./view'))

module.exports = app