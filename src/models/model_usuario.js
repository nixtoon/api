const { Schema, model } = require("mongoose");

const Usuario = new Schema({
  nombre: { type: String, required: true},
  user: { type: String, required: true },
  password: { type: String, required: true},
  correo: { type: String, required: true },
  perfil: { type: Number, required: true }
});

module.exports = model('Usuario', Usuario);