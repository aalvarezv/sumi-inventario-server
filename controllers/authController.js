const {Usuario, Maquina} = require('../config/db');
const bcrypt = require('bcryptjs');

const autenticarUsuario = async (req, res) => {
    
    try { 
        const { codigo, clave, codigo_maquina } = req.body

        console.log(req.body);

        let maquina = await Maquina.findByPk(codigo_maquina);
        if(!maquina){
            console.log('La máquina no está registrada, no puede operar.')
            return res.status(400).json({
                msg: 'La máquina no está registrada, no puede operar.'
            })
        }

        if(maquina.inactiva){
            console.log('La máquina se encuentra inactiva, no puede operar.')
            return res.status(400).json({
                msg: 'La máquina se encuentra inactiva, no puede operar.'
            })
        }

        //revisa que el usuario existe
        let usuario = await Usuario.findByPk(codigo);
        if (!usuario) {
            console.log('El usuario no existe')
            return res.status(400).json({
                msg: 'El usuario no existe'
            })
        }
    
        //revisar que el usuario no se encuentre inactivo
        if(usuario.inactivo){
            console.log('El usuario se encuentra inactivo')
            return res.status(401).json({
                msg: 'El usuario se encuentra inactivo'
            })
        }
        
        
        //revisar el password ingresado vs el password de la bd
        if(clave !== usuario.clave){
            console.log('El password es incorrecto')
            return res.status(401).json({
                msg: 'El password es incorrecto'
            })
        }
     
        res.json({
            usuario
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

module.exports = {
    autenticarUsuario,
}