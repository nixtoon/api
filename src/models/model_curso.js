const { Schema, model } = require('mongoose');

const Curso = Schema({
  nombre_curso: { type: String, required: [true, 'Nombre del curso obligatorio'] },
  sigla_curso: { type: String, required: [true, 'Sigla obligatoria'] },
  docente: { type: Schema.Types.ObjectId, ref: 'Docente' },
});

module.exports = model('curso', Curso);
