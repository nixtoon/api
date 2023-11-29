const { Schema, model } = require("mongoose");

const Curso = new Schema({
  nombre: { type: String },
  codigo: { type: String },
  seccion: { type: String },
  profesor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  alumnos: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
});

module.exports = model('Curso', Curso);

