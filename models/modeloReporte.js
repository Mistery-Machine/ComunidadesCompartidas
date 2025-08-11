const mongoose = require("mongoose");

const reporteSchema = new mongoose.Schema({
  tipo: String,
  descripcion: String,
  Autor: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
  estado: { type: String, enum: ["Pendiente", "En proceso", "Resuelto"] },
});

module.exports = mongoose.model("Reporte", reporteSchema);
