const Asistencia = require('../models/model_asistencia');

// Método para registrar la asistencia
const registrarAsistencia = async (req, res) => {
  const { alumnoId, cursoId, presente } = req.body;

  try {

    // Crear un nuevo documento de asistencia
    const asistencia = new Asistencia({
      alumno: alumnoId,
      curso: cursoId,
      presente: presente || false, // Si no se proporciona, establecer como falso por defecto
    });

    // Guardar el registro de asistencia en la base de datos
    const savedAsistencia = await asistencia.save();

    res.json({
      status: 200,
      mensaje: 'Asistencia registrada exitosamente',
      data: savedAsistencia,
    });
  } catch (err) {
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
