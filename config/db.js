const { Sequelize } = require('sequelize')
const {productosData} = require('./productos') 

const ConfiguracionModel = require('../models/Configuracion')
const UsuarioModel = require('../models/Usuario')
const RackModel = require('../models/Rack')
const ProductoModel = require('../models/Producto')
const RackProductoModel = require('../models/RackProducto')

//conexión a la bd
const sequelize = new Sequelize(process.env.DB_URI, {
    define: { 
        timestamps: false
    },
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '-03:00'
})

//Crea el modelo
const Configuracion = ConfiguracionModel(sequelize)
const Usuario = UsuarioModel(sequelize)
const Rack = RackModel(sequelize)
const Producto = ProductoModel(sequelize)
const RackProducto = RackProductoModel(sequelize, Usuario, Rack, Producto)


//Relaciones
RackProducto.belongsTo(Producto, {foreignKey : 'codigo_producto'})
RackProducto.belongsTo(Rack, {foreignKey : 'codigo_rack'})
RackProducto.belongsTo(Usuario, {foreignKey: 'codigo_usuario'})

sequelize.sync({ force: false }).then(async() => {

        try {
            console.log('**** CONECTADO A LA BASE DE DATOS ****')
            
            let usuarioExiste = Usuario.findByPk('162323695');
            if(!usuarioExiste){
                await Usuario.create({
                    codigo: '162323695',
                    clave: '123456',
                    nombre: 'Alan Patricio Alvarez Vargas',
                    email: 'alvarez.vargas@gmail.com',
                    telefono: '0',
                })
                
            }
            console.log('OK USUARIOS')

            await Rack.bulkCreate([{
                codigo: 'CB-UBICACION-1',
                descripcion: 'UBICACION 1'
            }])
            console.log('OK RACKS')
            
            let productosDuplicados = []
            for(let producto of productosData){

               let productoExiste = await Producto.findByPk(producto.codigo);
               if(productoExiste){
                   productosDuplicados.push(producto.codigo)
               }else{
                   await Producto.create({
                      codigo: producto.codigo,
                      descripcion: producto.descripcion,
                      inactivo: producto.inactivo
                   })
               }

            }
            console.log('OK PRODUCTOS')
          
        } catch (error) {
            console.log(error)
        }

    })

module.exports = {
    Configuracion,
    Usuario, 
    Rack,
    Producto,
    RackProducto,
    sequelize,
}