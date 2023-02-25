const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - (El correo no existe jaja)'
            });
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - (password incorrecta)'
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Login PATH',
            correo, password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }
}

module.exports = {
    login
}