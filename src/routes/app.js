const express = require('express');
const app = express.Router();
const usuario = require('../controller/route_usuario')
const docente = require('../controller/route_docente')
const curso = require('../controller/route_curso');
const asistencia = require('../controller/route_asistencia');

// Lista de Endpoints de los estudiantes

// listar usuarios app
app.get('/listarUsuarios', usuario.listarUsuarios);

// listar usuarios web
app.get('/listarContenido', usuario.listarContenido);

// agregar usuario post
app.post('/addUsuario', usuario.addUsuario);

// buscar usuario
app.get('/buscarUsuario', usuario.buscarUsuario);

// recovery
app.get('/recovery', usuario.recovery);





// Lista de Endpoints de los docentes

// listar usuarios app
app.get('/listarDocentes', docente.listarDocentes);

// agregar usuario post
app.post('/addDocente', docente.addDocente);

// buscar usuario
app.get('/buscarDocente', docente.buscarDocente);

// recovery
app.get('/recovery-docente', docente.recoveryDocente);





// lista de Endpoints de los cursos

//listar curso
app.get('/listar-cursos', curso.listarCursos);

// agregar curso
app.post('/agregar-curso', curso.addCurso);




// lista de Endpoints de las asistencia

// registrar asistencia
app.post('/registrar-asistencia', asistencia.registrarAsistencia)

module.exports = app;