const { Schema, model } = require('mongoose')

const Usuario = Schema({
  nombre_usuario: {type: String, require:[true, 'nombre usuario obligatorio']},
  password:       {type: String, require:[true, 'contraseña obligatorio']},
})

module.exports = model('usuarios', Usuario);