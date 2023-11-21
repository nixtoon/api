const { Schema, model } = require("mongoose");

const Curso = new Schema({
  nombre: { type: String },
  codigo: { type: String },
  seccion: { type: String },
  profesor: { type: Schema.Types.ObjectId, ref: 'Profesor' },
  alumnos: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
});

module.exports = model('Curso', Curso);

