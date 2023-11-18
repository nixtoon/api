const { Schema, model } = require("mongoose");

const Usuario = new Schema({
  id: Number,
  user: String,
  password: String,
  nombre: String,
  perfil: Number,
  correo: String,
});

module.exports = model('Usuario', Usuario);
