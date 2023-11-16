//const express = require('express')
// Conexion BD
const pool = require("../settings/db");
// Modelo BD
const Curso = require("../models/model_curso");
const Docente = require("../models/model_docente");
const Usuario = require("../models/model_usuario");

// listar Cursos
let listarCursos = async (req, res) => {
  try {
    const model = await Curso.find();
    const total = await Curso.countDocuments({});

    res.json({ status: 200, total, model });
    console.log(model);
  } catch (err) {
    res.json({
      status: 400,
      mensaje: "Error al leer el archivo",
      err,
    });
  }
};

// agregar curso

let addCurso = async (req, res) => {
  const { nombre_curso, sigla_curso, docente } = req.body;

  try {
    // Verifica que Docente esté definido
    if (!Docente) {
      return res.status(500).json({
        status: 500,
        mensaje: "Error al guardar el curso",
        err: "Docente is not defined",
      });
    }

    const curso = new Curso({
      nombre_curso,
      sigla_curso,
    });

    // Agregar docente si se proporciona
    if (docente) {
      const docenteExistente = await Docente.findById(docente);
      if (docenteExistente) {
        curso.docente = docenteExistente._id;
      } else {
        return res.status(400).json({
          status: 400,
          mensaje: "Docente no encontrado",
        });
      }
    }

    const savedCurso = await curso.save();


    res.json({
      status: 200,
      mensaje: "Curso guardado exitosamente",
      savedCurso
    });
  } catch (err) {
    console.error(err); // Agregar esta línea para imprimir el error en la consola
    res.status(500).json({
      status: 500,
      mensaje: "Error al guardar el curso",
      err: err.message, // Modificación: mostrar solo el mensaje de error
    });
  }
};

module.exports = {
  listarCursos,
  addCurso,
};
