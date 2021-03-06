const {Producto, Rack, RackProducto, Usuario, sequelize} = require('../config/db')
const { Op, Sequelize } = require('sequelize');

exports.getRegistros = async (req, res) => {

    try{
        /*[Sequelize.literal('(SELECT descripcion FROM niveles_academicos WHERE codigo = `curso_usuarios->curso`.`codigo_nivel_academico`)'),'descripcion_nivel_academico']*/

        //devuelve la cantidad de productos inventariados en el rack por el usuario
        let rack_productos =  await RackProducto.findAll({
            attributes: [
                'codigo_rack',
                'codigo_usuario',
                'codigo_producto',
                'codigo_maquina',
                [sequelize.fn('sum', sequelize.col('cantidad')), 'total'],
                [Sequelize.literal('(SELECT COUNT(*) FROM rack_productos WHERE codigo_usuario = `rack_producto`.`codigo_usuario` AND codigo_rack = `rack_producto`.`codigo_rack` AND codigo_producto = `rack_producto`.`codigo_producto` AND DATE(createdAt) = CURDATE() )'),'lecturas'],
                [Sequelize.literal('(SELECT MAX(createdAt) FROM rack_productos WHERE codigo_usuario = `rack_producto`.`codigo_usuario` AND codigo_rack = `rack_producto`.`codigo_rack` AND codigo_producto = `rack_producto`.`codigo_producto` AND DATE(createdAt) = CURDATE() )'),'fecha_hora_ultima_marca']
            ],
            include:[{
                attributes: ['codigo','descripcion'],
                model: Rack,
            },{
                attributes: ['codigo','descripcion'],
                model: Producto,
            },{
                attributes: ['codigo', 'nombre'],
                model: Usuario
            }],
            where:{
                [Op.and]:[
                    sequelize.where(
                        sequelize.fn('date', sequelize.col('rack_producto.createdAt')), '=', sequelize.fn('CURDATE')
                    )
                ]
            },
            group: ['codigo_rack','codigo_producto'],
            order: [
                [Sequelize.literal('fecha_hora_ultima_marca'), 'DESC'],
            ]

        })
        
        res.json({
            rack_productos,
        })
        

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }

   
}
