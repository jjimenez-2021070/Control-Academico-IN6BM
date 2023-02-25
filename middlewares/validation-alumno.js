const Usuario = require('../models/usuario');

const esAlumno = async (req, res, next) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        if (usuario.rol !== 'ALUMNO_ROL') {
            return res.status(401).json({
                msg: 'No está autorizado para realizar esta acción'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

module.exports = {
    esAlumno
}