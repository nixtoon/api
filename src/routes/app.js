const express = require('express');
const app = express.Router();
const curso = require('../controller/route_curso');
const asistencia = require('../controller/route_asistencia');
const alumno = require('../controller/route_alumno');
const profesor = require('../controller/route_profesores');

app.post('/registrar-asistencia', asistencia.registrarAsistencia)
app.post('/login-alumno', alumno.loginAlumno);
app.post('/login-profesor', profesor.loginProfesor);
app.post('/agregar-alumno', alumno.addAlumno);
app.post('/agregar-curso', curso.addCurso);
app.post('/agregar-profesor', profesor.addProfesor);
app.get('/cursos', curso.getCursos);
app.get('/listar-cursos', curso.listarCursos);
app.get('/detalle-curso', curso.detalleCurso)

module.exports = app;