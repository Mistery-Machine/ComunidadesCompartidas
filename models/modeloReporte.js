const mongoose = require("mongoose");

const reporteSchema = new mongoose.Schema({
  tipo: String,
  descripcion: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reporte", reporteSchema);
