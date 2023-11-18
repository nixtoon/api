const pool = require("../settings/db");
const Alumno = require("../models/model_alumno");

// agregar alumno 
let addAlumno = async (req, res) => {

  const { id, nombre, user, password, correo, perfil } = req.body;

  try {

    const alumno = new Alumno({id, nombre, user, password, correo, perfil });

    const savedAlumno = await alumno.save();

    res.json({
      status: 200,
      mensaje: "Alumno guardado exitosamente",
      savedAlumno,
    });

  }catch(err) {
    console.error(err); 
    res.status(500).json({
      status: 500,
      mensaje: "Error al guardar el alumno",
      err: err.message, 
    });
  }

};

let loginAlumno = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ status: 400, mensaje: "Nombre de usuario y contraseña son requeridos." });
    }

    // Realiza la búsqueda en la base de datos por nombre de usuario y contraseña
    const alumno = await Alumno.findOne({ user, password });

    if (!alumno) {
      return res.status(404).json({ status: 404, mensaje: "Usuario no encontrado." });
    }

    res.json({
      status: 200,
      usuario: {
        id: alumno.id,
        nombre: alumno.nombre,
        user: alumno.user,
        correo: alumno.correo,
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
  addAlumno, 
  loginAlumno
}