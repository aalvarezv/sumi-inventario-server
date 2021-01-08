const { DataTypes } = require('sequelize')

module.exports = (sequelize, type) =>{

    return sequelize.define('producto',{
        codigo:{
            type: DataTypes.STRING(128),
            primaryKey: true,
            allownull: false
        },
        descripcion:{
            type: DataTypes.STRING(128),
            allownull: false
        },
        inactivo:{
            type: DataTypes.BOOLEAN,
            allownull: false,
            defaultValue: false,
        }
    },{
        //agrega atributos timestamp (updatedAt, createdAt).
        timestamps: true,
        //evita que sequelize ponga el nombre de la tabla en plural.
        freezeTableName: true, 
        //agrega el nombre de la tabla.
        tableName: 'productos'
    })
}