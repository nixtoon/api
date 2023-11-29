const Usuario = require("../models/model_usuario");
const pool = require("../settings/db");

// agregar usuario
let addUsuario = async (req, res) => {

  const { nombre, user, password, correo, perfil } = req.body;

  try {

    const usuario = new Usuario({ nombre, user, password, correo, perfil });

    const savedUsuario = await usuario.save();

    res.json({
      status: 200,
      mensaje: "Usuario guardado exitosamente",
      savedUsuario,
    });

  }catch(err) {
    console.error(err.stack); 
    res.status(500).json({
      status: 500,
      mensaje: "Error al guardar el usuario",
      err: err.message, 
    });
  }
};

// login
let login = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario y contraseña son requeridos." });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const usuario = await Usuario.findOne({ user, password });

    if (!usuario) {
      return res.status(404).json({ status: 404, mensaje: "Usuario no encontrado." });
    }

    res.json({
      status: 200,
      usuario: {
        _id: usuario.id,
        nombre: usuario.nombre,
        user: usuario.user,
        correo: usuario.correo,
        perfil: usuario.perfil
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      mensaje: "Error al buscar el usuario",
      err
    });
  }
};

module.exports = {
  addUsuario, 
  login
}