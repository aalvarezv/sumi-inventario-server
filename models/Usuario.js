const { DataTypes } = require('sequelize')

module.exports = (sequelize, type) =>{

    return sequelize.define('usuario', {
        codigo:{
            type: DataTypes.STRING(128),
            primaryKey: true,
            allowNull: false 
        },
        clave:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inactivo:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },{
        //agrega atributos timestamp (updatedAt, createdAt).
        timestamps: true,
        //evita que sequelize ponga el nombre de la tabla en plural.
        freezeTableName: true, 
        //agrega el nombre de la tabla.
        tableName: 'usuarios'
    })

}