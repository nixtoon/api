const Asistencia = require('../models/model_asistencia');
const Curso = require('../models/model_curso');

// Método para registrar la asistencia
const registrarAsistencia = async (req, res) => {
  const { cursoId, presente } = req.body;

  try {
    // Validar si el curso existe
    const cursoExistente = await Curso.findById(cursoId);
    if (!cursoExistente) {
      return res.status(400).json({
        status: 400,
        mensaje: 'El curso especificado no existe',
      });
    }

    // Crear un nuevo documento de asistencia utilizando el método create de Mongoose
    const savedAsistencia = await Asistencia.create({
      curso: cursoId,
      presente: presente || false,
    });

    res.json({
      status: 200,
      mensaje: 'Asistencia registrada exitosamente',
      data: savedAsistencia,
    });
  } catch (err) {
    // Manejar errores específicos de Mongoose, como ValidationError
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 400,
        mensaje: 'Error de validación al registrar la asistencia',
        err: err.message,
      });
    }

    console.error(err);
    res.status(500).json({
      status: 500,
      mensaje: 'Error al registrar la asistencia',
      err: err.message,
    });
  }
};

module.exports = {
  registrarAsistencia,
};
