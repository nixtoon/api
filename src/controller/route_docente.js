//const express = require('express')
// Conexion BD
const pool = require('../settings/db')
// Modelo BD
const Docente = require('../models/model_docente')

// listar docentes app
let listarDocentes = async (req, res) => {
  try {
    const model = await Docente.find();
    const total = await Docente.countDocuments({});
    
    res.json({ status: 200, total, model });
    console.log(model);
  } catch (err) {
    res.json({
      status: 400,
      mensaje: "Error al leer el archivo",
      err
    });
  }
};

// agregar docente
let addDocente = async (req, res) => {
  const { nombre_docente, password_docente, cursos } = req.body;

  try {
    const docente = new Docente({
      nombre_docente,
      password_docente,
      cursos,
    });
    
    const savedDocente = await docente.save();
    
    res.json({
      status: 200,
      mensaje: 'Docente saved successfully',
      data: savedDocente
    });
  } catch (err) {
    res.json({
      status: 400,
      mensaje: 'Error saving docente',
      err
    });
  }
};

// Buscar docente por nombre de usuario y contraseña
let buscarDocente = async (req, res) => {
  try {
    const { nombre_docente, password_docente } = req.query;

    if (!nombre_docente || !password_docente) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario y contraseña son requeridos." });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const docente = await Docente.findOne({ nombre_docente, password_docente });

    if (!docente) {
      return res.status(404).json({ status: 404, mensaje: "Docente no encontrado." });
    }

    res.json({ status: 200, docente });
  } catch (err) {
    res.status(500).json({
      status: 500,
      mensaje: "Error al buscar el docente",
      err
    });
  }
};

// Buscar docente por nombre de usuario para recuperar contraseña
let recoveryDocente = async (req, res) => {
  try {
    const { nombre_docente } = req.query;

    if (!nombre_docente) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario es requerido" });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const docente = await Docente.findOne({ nombre_docente });

    if (!docente) {
      return res.status(404).json({ status: 404, mensaje: "Docente no encontrado." });
    }

    res.json({ status: 200, docente });
  } catch (err) {
    res.status(500).json({
      status: 500,
      mensaje: "Error al buscar el docente",
      err
    });
  }
};

module.exports = {
  listarDocentes,
  addDocente,
  buscarDocente,
  recoveryDocente,
};