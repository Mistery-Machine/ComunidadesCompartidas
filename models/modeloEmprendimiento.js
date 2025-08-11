const mongoose = require("../db");

const emprendimientoSchema = mongoose.Schema(
  {
    nombre: String,
    telefono: String,
    ubicacion: String,
    categoria: String,
    descripcion: String,
    registro: String,
    estado: { type: String, enum: ["activo", "inactivo"], default: "inactivo" },
  },
  { versionKey: false }
);
//             nombre, esquema
const emprendimientoModel = mongoose.model(
  "emprendimientos",
  emprendimientoSchema
);

module.exports = emprendimientoModel;
