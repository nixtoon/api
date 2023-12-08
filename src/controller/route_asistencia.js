const Asistencia = require("../models/model_asistencia");
const Curso = require("../models/model_curso");
const Usuario = require("../models/model_usuario");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const pool = require("../settings/db");

// Método para registrar la asistencia
const registrarAsistencia = async (req, res) => {
  const { idAlumno, nombreAlumno, idCurso,  nombreCurso, codigoCurso, seccionCurso, presente } = req.body;

  try {
    const asistencia = new Asistencia({
      idAlumno: new ObjectId(idAlumno),
      nombreAlumno,
      idCurso: new ObjectId(idCurso),
      nombreCurso,
      codigoCurso,
      seccionCurso,
      presente,
    });

    if (idAlumno !== undefined) {
      const alumnoExiste = await Usuario.findById(asistencia.idAlumno);
      if (!alumnoExiste) {
        return res.status(400).json({
          status: 400,
          mensaje: "Alumno no encontrado",
        });
      }
    }

    if (idCurso !== undefined) {
      const cursoExiste = await Curso.findById(asistencia.idCurso);
      if (!cursoExiste) {
        return res.status(400).json({
          status: 400,
          mensaje: "Curso no encontrado",
        });
      }
    }

    const savedAsistencia = await asistencia.save();

    res.json({
      status: 200,
      mensaje: "Asistencia registrada exitosamente",
      savedAsistencia,
    });
  } catch (err) {
    // Manejar errores específicos de Mongoose
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        status: 400,
        mensaje: "Error de validación al registrar la asistencia",
        err: err.message,
      });
    }

    // Otros errores no manejados específicamente
    console.error(err);
    res.status(500).json({
      status: 500,
      mensaje: "Error al registrar la asistencia",
      err: err.message,
    });
  }
};

module.exports = {
  registrarAsistencia,
};
