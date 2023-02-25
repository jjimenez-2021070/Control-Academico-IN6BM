const { response, request } = require('express');
const curso = require('../models/curso');
const Curso = require('../models/curso');
const Usuario = require('../models/usuario');

const getCurso = async (req = request, res = response) => {

    const query = { estado: true };
    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query).populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'get Api - Controlador Curso',
        listaCursos
    });

}

const postCurso = async (req = request, res = response) => {

    const { nombreCurso } = req.body;
    const cursoGuardado = new Curso({ nombreCurso });
    await cursoGuardado.save();
    res.json({
        msg: 'Post Api - Post Curso',
        cursoGuardado
    });

}

const putCurso = async (req = request, res = response) => {
 
    const { id } = req.params;
    const { estado, usuario, ...resto} = req.body;

    //resto.nombreCurso = resto.nombreCurso.toUpperCase();
    
    // resto.usuario = req.usuario._id;
 
    const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });
    res.json([
        cursoEditado, Curso.nombreCurso
    ]);

    
}

const deleteCurso = async (req = request, res = response) => {
    const { id } = req.params;
    const cursoEliminado = await Curso.findByIdAndUpdate(id , {estado: false});

    res.json({
        msg: 'DELETE eliminacion curso',
        cursoEliminado
    });
}

module.exports = {
    getCurso,
    postCurso,
    putCurso,
    deleteCurso
}