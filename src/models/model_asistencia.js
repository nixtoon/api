const { Schema, model } = require("mongoose");
const { schema } = require("./model_curso");

const Asistencia = Schema({
  idAlumno: { type: Schema.Types.ObjectId, ref: 'Usuario'},
  nombreAlumno: { type: String, required: true },
  idCurso: { type: Schema.Types.ObjectId, ref: 'Curso'},
  nombreCurso: { type: String, required: true },
  codigoCurso: { type: String, required: true },
  seccionCurso: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  presente: {type: Boolean, default: false },
});

module.exports = model('Asistencia', Asistencia);
