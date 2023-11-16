const { Schema, model } = require('mongoose');

const AsistenciaSchema = new Schema({
  curso: {
    type: Schema.Types.ObjectId,
    ref: 'Curso',
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  presente: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Asistencia', AsistenciaSchema);
