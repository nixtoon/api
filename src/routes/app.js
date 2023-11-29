const express = require('express');
const app = express.Router();
const curso = require('../controller/route_curso');
const asistencia = require('../controller/route_asistencia');
const usuario = require('../controller/route_usuario');

app.post('/registrar-asistencia', asistencia.registrarAsistencia)
app.post('/agregar-curso', curso.addCurso);
app.get('/cursos', curso.getCursos);
app.get('/listar-cursos', curso.listarCursos);
app.get('/detalle-curso', curso.detalleCurso);
app.post('/agregar-usuario', usuario.addUsuario);
app.post('/login', usuario.login);

module.exports = app;