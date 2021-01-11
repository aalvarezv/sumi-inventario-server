const {Rack, Producto, RackProducto, sequelize} = require('../config/db');
const { Op } = require('sequelize');

const getRack = async (req, res) => {
    
    try { 

        const { codigo, codigo_usuario } = req.query 
        //revisa que el rack existe
        let rack = await Rack.findByPk(codigo);
        if (!rack) {
            console.log('El código rack no existe')
            return res.status(400).json({
                msg: 'El código rack no existe'
            })
        }
    
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
                    {codigo_rack: codigo},
                    {codigo_usuario: codigo_usuario},
                    sequelize.where(
                        sequelize.fn('date', sequelize.col('rack_producto.createdAt')), '=', sequelize.fn('CURDATE')
                    )
                ]
            },
            group: ['codigo_producto'],

        })

        res.json({
            rack,
            rack_productos
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

module.exports = {
    getRack,
}