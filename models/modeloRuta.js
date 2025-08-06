const mongoose = require("../db");

const rutaSchema = mongoose.Schema(
  {
    numeroRuta: String,
    recorrido: String,
    horarioLunVie: String,
    horarioSabado: String,
    horarioDomingo: String,
    frecuencia: String,
    estado: String,
    fechaRegistro: String,
  },
  { versionKey: false }
);

const rutaModel = mongoose.model("rutas", rutaSchema);

module.exports = rutaModel;
