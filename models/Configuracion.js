const { DataTypes } = require('sequelize')

module.exports = (sequelize) =>{

    return sequelize.define('configuracion', {
        seccion:{
            type: DataTypes.STRING(128),
            primaryKey: true,
            allownull: false
        },
        clave:{
            type: DataTypes.STRING(128),
            primaryKey: true,
            allownull: false
        },
        valor:{
            type: DataTypes.STRING(128),
            allownull: false,
        }
    },{
        //agrega atributos timestamp (updatedAt, createdAt).
        timestamps: true,
        //evita que sequelize ponga el nombre de la tabla en plural.
        freezeTableName: true, 
        //agrega el nombre de la tabla.
        tableName: 'configuraciones'
    })
}