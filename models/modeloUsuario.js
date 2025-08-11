const mongoose = require("../db");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, minlength: 3 },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true, minlength: 8 },
  rol: { type: String, enum: ["administrador", "cliente"], required: true },
  fechaNacimiento: { type: Date, required: true },
  telefono: { type: String, required: true, match: /^\d{8}$/ },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
