const pool = require("../settings/db");
const Profesor = require("../models/model_profesores");
const Curso = require('../models/model_curso');

// agregar profesor
let addProfesor = async (req, res) => {
  const { id, nombre, user, password, correo, cursos } = req.body;

  try {
    const profesor = new Profesor({ id, nombre, user, password, correo });
    // Agregar cursos si se proporciona
    if (cursos) {
      const cursoExiste = await Curso.findOne({ id: cursos });
      if (cursoExiste) {
        profesor.cursos = [cursoExiste.id];
      } else {
        return res.status(400).json({
          status: 400,
          mensaje: "Curso no encontrado",
        });
      }
    }

    const savedProfesor = await profesor.save();

    res.json({
      status: 200,
      mensaje: "Profesor guardado exitosamente",
      savedProfesor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      mensaje: "Error al guardar el profesor",
      err: err.message,
    });
  }
};

let loginProfesor = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario y contraseña son requeridos." });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const profesor = await Profesor.findOne({ user, password });

    if (!profesor) {
      return res.status(404).json({ status: 404, mensaje: "Usuario no encontrado." });
    }

    res.json({
      status: 200,
      usuario: {
        id: profesor.id,
        nombre: profesor.nombre,
        user: profesor.user,
        correo: profesor.correo,
        cursos: profesor.cursos
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      mensaje: "Error al buscar el usuario",
      err
    });
  }
};

module.exports = {
  addProfesor,
  loginProfesor
};
