const { Schema, model } = require("mongoose");

const Asistencia = Schema({
  alumno: { type: Number, ref: 'Alumno' },
  curso: { type: Number, ref: 'Curso' },
  fecha: { type: Date, default: Date.now },
  presente: {type: Boolean, default: false },
});

module.exports = model('Asistencia', Asistencia);
