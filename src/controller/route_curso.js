//const express = require('express')
// Conexion BD
const pool = require("../settings/db");
// Modelo BD
const Curso = require("../models/model_curso");
const Usuario = require("../models/model_usuarios");
const Profesor = require("../models/model_profesores");
const Alumno = require("../models/model_alumno");

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

let getCursos = async (req, res) => {
  try {
    const { profesorid } = req.query;

    const profesor = await Profesor.findOne({ id: profesorid });

    if (!profesor) {
      return res
        .status(404)
        .json({ status: 404, mensaje: "Profesor no encontrado." });
    }

    const cursos = await Curso.find({ id: { $in: profesor.cursos } });

    if (!cursos || cursos.length === 0) {
      return res
        .status(404)
        .json({ status: 404, mensaje: "Cursos no encontrados para el profesor." });
    }

    res.json({ status: 200, cursos });
  } catch (err) {
    console.error("Error al obtener los cursos:", err);
    res.status(500).json({
      status: 500,
      mensaje: "Error al obtener los cursos",
      err,
    });
  }
};


// agregar curso

let addCurso = async (req, res) => {
  const { id, nombre, codigo, seccion, alumnos } = req.body;

  try {
    const curso = new Curso({
      id,
      nombre,
      codigo,
      seccion,
      alumnos,
    });

    // Agregar alumnos si se proporciona
    if (alumnos) {
      // Convertir la cadena de alumnos a un array de números
      const idsAlumnos = alumnos.split(',').map(Number);

      // Buscar los alumnos por sus IDs
      const alumnosExistentes = await Alumno.find({ id: { $in: idsAlumnos } });

      if (alumnosExistentes.length === idsAlumnos.length) {
        // Todos los alumnos existen, asignar los IDs al array
        curso.alumnos = idsAlumnos;
      } else {
        // Al menos uno de los alumnos no fue encontrado
        return res.status(400).json({
          status: 400,
          mensaje: "Uno o más alumnos no encontrados",
        });
      }
    }

    const savedCurso = await curso.save();

    res.json({
      status: 200,
      mensaje: "Curso guardado exitosamente",
      savedCurso,
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
  getCursos,
};
