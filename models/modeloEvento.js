const mongoose = require("../db");

const eventoSchema = mongoose.Schema(
  {
    titulo: String,
    categoria: String,
    fechaGeneracion: String,
    ubicacion: String,
    organizador: String,
    fechaEvento: String,
    estado: String,
  },
  { versionKey: false }
);

const eventoModel = mongoose.model("eventos", eventoSchema);

module.exports = eventoModel;
