const { DataTypes } = require('sequelize')

module.exports = (sequelize, Usuario, Rack, Producto, Maquina) => {

    return sequelize.define('rack_producto', {
        codigo:{
            type: DataTypes.STRING(128),
            primaryKey: true,
            allownull: false
        },
        codigo_usuario:{
            type: DataTypes.STRING(128),
            allownull: false,
            references:{
                model: Usuario,
                key: 'codigo'
            }
        },
        codigo_rack:{
            type: DataTypes.STRING(128),
            allownull: false,
            references:{
                model: Rack,
                key: 'codigo'
            }
        },
        codigo_producto:{
            type: DataTypes.STRING(128),
            allownull: false,
            references:{
                model: Producto,
                key: 'codigo'
            }
        },
        codigo_maquina:{
            type: DataTypes.STRING(128),
            allownull: false,
            references:{
                model: Maquina,
                key: 'codigo'
            }
        },
        cantidad:{
            type: DataTypes.INTEGER,
            allownull: false,
            defaultValue: 0,
        },
        inactivo:{
            type: DataTypes.BOOLEAN,
            allownull: false,
            defaultValue: false
        }
    },{
        //agrega atributos timestamp (updatedAt, createdAt).
        timestamps: true,
        //evita que sequelize ponga el nombre de la tabla en plural.
        freezeTableName: true, 
        //agrega el nombre de la tabla.
        tableName: 'rack_productos'
    })
}