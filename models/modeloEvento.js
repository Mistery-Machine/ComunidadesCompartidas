const mongoose = require("../db");

const eventoSchema = mongoose.Schema(
  {
    titulo: String,
    categoria: String,
    fechaGeneracion: String,
    ubicacion: String,
    organizador: String,
    fechaEvento: String,
    estado: { type: String, enum: ["activo", "inactivo"] },
  },
  { versionKey: false }
);

const eventoModel = mongoose.model("eventos", eventoSchema);

module.exports = eventoModel;
