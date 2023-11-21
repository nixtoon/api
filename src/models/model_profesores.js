const { Schema, model } = require("mongoose");

const Profesor = new Schema({
  nombre: { type: String, required: true},
  user: { type: String, required: true },
  password: { type: String, required: true},
  correo: { type: String, required: true },
});

module.exports = model('Profesor', Profesor);
