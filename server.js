if(process.env.NODE_ENV === "PRD"){
    require('dotenv').config({ path: './prd.env' })
}else if(process.env.NODE_ENV === "DEV"){
    require('dotenv').config({ path: './dev.env' })
}

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
//Creamos el servidor.
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
    // parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

//habilitar cors.
app.use(cors())

//Puerto de la app.
const PORT = process.env.PORT || 3002

//Habilitar express.json.
app.use(express.json({ extended: true, limit: '150mb' }))

//Import de rutas.
app.use(require('./routes/index'))


//Inicia el servidor.
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT} ${new Date().toLocaleTimeString()}`)
})