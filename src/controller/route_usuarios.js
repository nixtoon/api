const Usuarios = require('../models/model_usuarios');

let login = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario y contraseña son requeridos." });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const usuario = await Usuarios.findOne({ user, password });

    if (!usuario) {
      return res.status(404).json({ status: 404, mensaje: "Usuario no encontrado." });
    }

    res.json({
      status: 200,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        user: usuario.user,
        correo: usuario.correo,
        tipoPerfil: usuario.perfil
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
  login,
}