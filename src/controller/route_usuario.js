//const express = require('express')
// Conexion BD
const pool = require('../settings/db')
// Modelo BD
const Usuario = require('../models/model_usuario')

// listar usuarios app
let listarUsuarios = async (req, res) => {
  try {
    const model = await Usuario.find();
    const total = await Usuario.countDocuments({});
    
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

// listar usuarios web
let listarContenido = async (req, res) => {
  try {
    const model = await Usuario.find();
    const total = await Usuario.countDocuments({});
    
    res.render('index', { Usuario });
    console.log(model);
  } catch (err) {
    res.json({
      status: 400,
      mensaje: "Error al leer el archivo",
      err
    });
  }
};

let addUsuario = async (req, res) => {
  const { nombre_usuario, password } = req.body;

  try {
    const usuario = new Usuario({
      nombre_usuario,
      password
    });
    
    const savedUsuario = await usuario.save();
    
    res.json({
      status: 200,
      mensaje: 'Usuario saved successfully',
      data: savedUsuario
    });
  } catch (err) {
    res.json({
      status: 400,
      mensaje: 'Error saving usuario',
      err
    });
  }
};

// Buscar usuario por nombre de usuario y contraseña
let buscarUsuario = async (req, res) => {
  try {
    const { nombre_usuario, password } = req.query;

    if (!nombre_usuario || !password) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario y contraseña son requeridos." });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const usuario = await Usuario.findOne({ nombre_usuario, password });

    if (!usuario) {
      return res.status(404).json({ status: 404, mensaje: "Usuario no encontrado." });
    }

    res.json({ status: 200, usuario });
  } catch (err) {
    res.status(500).json({
      status: 500,
      mensaje: "Error al buscar el usuario",
      err
    });
  }
};

// Buscar usuario por nombre de usuario para recuperar contraseña
let recovery = async (req, res) => {
  try {
    const { nombre_usuario } = req.query;

    if (!nombre_usuario) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario es requerido" });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const usuario = await Usuario.findOne({ nombre_usuario });

    if (!usuario) {
      return res.status(404).json({ status: 404, mensaje: "Usuario no encontrado." });
    }

    res.json({ status: 200, usuario });
  } catch (err) {
    res.status(500).json({
      status: 500,
      mensaje: "Error al buscar el usuario",
      err
    });
  }
};


module.exports = {
  listarUsuarios,
  listarContenido,
  addUsuario,
  buscarUsuario,
  recovery
};