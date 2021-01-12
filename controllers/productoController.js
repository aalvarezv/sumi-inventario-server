const {Producto, Rack, RackProducto, sequelize} = require('../config/db')
const { Op } = require('sequelize')
const uuidv4 = require('uuid').v4


const getProducto = async (req, res) => {
    
    try{
        
        const { codigo } = req.query
        //revisa que el producto existe
        let producto = await Producto.findByPk(codigo)
        if (!producto) {
            console.log('El código producto no existe', codigo)
            return res.status(400).json({
                msg: 'El código producto no existe'
            })
        }

        res.json({
            producto,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }

}

const getProductos = async (req, res) => {

    try{
        
        //revisa que el producto existe
        let productos = await Producto.findAll({
            inactivo: false,
        })
        

        res.json({
            productos,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

const registrarProducto = async (req, res) => {
    
    try { 

        const { codigo, codigo_rack, codigo_usuario, cantidad, codigo_maquina } = req.body
       //revisa que el usuario existe
        let producto = await Producto.findByPk(codigo)
        if (!producto) {
            console.log('El código producto no existe')
            return res.status(400).json({
                msg: 'El código producto no existe'
            })
        }

        //registra el producto en el rack
        await RackProducto.create({
            codigo: uuidv4(),
            codigo_usuario,
            codigo_rack,
            codigo_producto: codigo,
            cantidad,
            codigo_maquina,
        })
    
        //devuelve la cantidad de productos inventariados en el rack por el usuario
        let rack_productos =  await RackProducto.findAll({
            attributes: [
                'codigo_rack',
                'codigo_usuario',
                'codigo_producto',
                [sequelize.fn('sum', sequelize.col('cantidad')), 'total'],
            ],
            include:[{
                attributes: ['codigo','descripcion'],
                model: Rack,
            },{
                attributes: ['codigo','descripcion'],
                model: Producto,
            }],
            where:{
                [Op.and]:[
                    {codigo_rack},
                    {codigo_usuario: codigo_usuario},
                    sequelize.where(
                        sequelize.fn('date', sequelize.col('rack_producto.createdAt')), '=', sequelize.fn('CURDATE')
                    )
                ]
            },
            group: ['codigo_producto'],

        })

        res.json({
            rack_productos
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

module.exports = {
    registrarProducto,
    getProducto,
    getProductos
}