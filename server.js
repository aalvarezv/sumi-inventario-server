const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars')
//Creamos el servidor.
const app = express()
app.engine('handlebars', exphbs({
    helpers:{
      // Function to do basic mathematical operation in handlebar
      math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
          rvalue = parseFloat(rvalue);
          return {
              "+": lvalue + rvalue,
              "-": lvalue - rvalue,
              "*": lvalue * rvalue,
              "/": lvalue / rvalue,
              "%": lvalue % rvalue
          }[operator];
      }
  }}))
app.set('view engine', 'handlebars')

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