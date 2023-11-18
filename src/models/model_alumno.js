const { Schema, model } = require("mongoose");

const Alumno = new Schema({
  id: { type: Number, required: true},
  nombre: { type: String, required: true},
  user: { type: String, required: true },
  password: { type: String, required: true},
  correo: { type: String, required: true },
  perfil: { type: Number },
});

module.exports = model('Alumno', Alumno);