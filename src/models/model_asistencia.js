const { Schema, model } = require("mongoose");

const Asistencia = Schema({
  alumno: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  curso: { type: Schema.Types.ObjectId, ref: 'Curso' },
  fecha: { type: Date, default: Date.now },
  presente: {type: Boolean, default: false },
});

module.exports = model('Asistencia', Asistencia);
