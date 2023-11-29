// Modelo BD
const Curso = require("../models/model_curso");
const mongoose = require("mongoose");
const Usuario = require("../models/model_usuario");
const pool = require("../settings/db");

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

// buscar curso por id profesor
let getCursos = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        status: 400,
        mensaje: "Se requiere proporcionar el ID del profesor.",
      });
    }

    // Convertir el profesorId a un ObjectId de mongoose
    const objectIdProfesor = new mongoose.Types.ObjectId(id);

    // Buscar al profesor por su ID para verificar si existe
    const profesor = await Usuario.findOne({ _id: objectIdProfesor });

    if (!profesor) {
      return res.status(404).json({
        status: 404,
        mensaje: "Profesor no encontrado.",
      });
    }

    // Obtener los cursos correspondientes al profesor
    const cursos = await Curso.find({ profesor: objectIdProfesor });

    if (!cursos || cursos.length === 0) {
      return res.status(404).json({
        status: 404,
        mensaje: "No se encontraron cursos para el profesor.",
      });
    }

    // Devolver los cursos en un arreglo en la respuesta
    const cursosArray = cursos.map((curso) => ({
      _id: curso._id,
      nombre: curso.nombre,
      codigo: curso.codigo,
      seccion: curso.seccion,
      profesor: curso.profesor,
    }));

    res.json({ status: 200, cursos: cursosArray });
  } catch (err) {
    console.error("Error al obtener los cursos:", err);
    res.status(500).json({
      status: 500,
      mensaje: "Error al obtener los cursos",
      err: err.message,
    });
  }
};

// agregar curso

let addCurso = async (req, res) => {
  const { nombre, codigo, seccion, profesor, alumnos } = req.body;

  try {
    const curso = new Curso({
      nombre,
      codigo,
      seccion,
      profesor,
      alumnos: [], // Inicializamos como un arreglo vacío
    });

    // Agregar alumnos si se proporciona
    if (alumnos) {
      // Convertir la cadena de alumnos a un array de ObjectID
      const idsAlumnos = alumnos.map((_id) => new mongoose.Types.ObjectId(_id));

      // Buscar los alumnos por sus IDs
      const alumnosExistentes = await Alumno.find({ _id: { $in: idsAlumnos } });

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
    console.error(err);
    res.status(500).json({
      status: 500,
      mensaje: "Error al guardar el curso",
      err: err.message,
    });
  }
};

// buscar curso por id del curso
let detalleCurso = async (req, res) => {
  try {
    const { cursoId } = req.query;

    if (!cursoId) {
      return res.status(400).json({
        status: 400,
        mensaje: "Se requiere proporcionar el ID del curso.",
      });
    }

    const objectIdCurso = new mongoose.Types.ObjectId(cursoId);

    const curso = await Curso.findOne({ _id: objectIdCurso });

    if (!curso) {
      return res.status(404).json({
        status: 404,
        mensaje: "Curso no encontrado.",
      });
    }

    return res.status(200).json({
      status: 200,
      mensaje: "Curso encontrado exitosamente.",
      curso: {
        id: curso._id,
        nombre : curso.nombre,
        codigo : curso.codigo,
        seccion: curso.seccion,
        profesor: curso.profesor,
      }
    });
  } catch (err) {
    console.error(err); // Registra cualquier error en la consola
    return res.status(500).json({
      status: 500,
      mensaje: "Error interno del servidor.",
    });
  }
};

module.exports = {
  listarCursos,
  addCurso,
  getCursos,
  detalleCurso
};
