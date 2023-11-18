const { Schema, model } = require("mongoose");

const Curso = new Schema({
  id: { type: Number, required: true},
  nombre: { type: String },
  codigo: { type: String },
  seccion: { type: String },
  alumnos: [{  type: Number, ref: 'Alumno' }],
});

module.exports = model('Curso', Curso);

