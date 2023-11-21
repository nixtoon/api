const Asistencia = require("../models/model_asistencia");
const Curso = require("../models/model_curso");
const Alumno = require("../models/model_alumno");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// Método para registrar la asistencia
const registrarAsistencia = async (req, res) => {
  const { alumnoId, cursoId, presente } = req.body;

  try {
    const asistencia = new Asistencia({
      alumno: new ObjectId(alumnoId),
      curso: new ObjectId(cursoId),
      presente,
    });

    if (alumnoId !== undefined) {
      const alumnoExiste = await Alumno.findById(asistencia.alumno);
      if (!alumnoExiste) {
        return res.status(400).json({
          status: 400,
          mensaje: "Alumno no encontrado",
        });
      }
    }

    if (cursoId !== undefined) {
      const cursoExiste = await Curso.findById(asistencia.curso);
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
