const { Schema, model } = require('mongoose')

const Docente = Schema({
  nombre_docente  : {type: String, require:[true, 'nombre usuario obligatorio']},
  password_docente: {type: String, require:[true, 'contraseña obligatorio']},
  cursos: [
    { type: Schema.Types.ObjectId, ref: 'Curso' }
  ]
})

module.exports = model('docente', Docente);