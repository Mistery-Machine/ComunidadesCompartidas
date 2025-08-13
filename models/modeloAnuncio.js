const mongoose = require("mongoose");

const anuncioSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    categoria: String,
    fecha: {
        type: Date,
        default: Date.now,
    },
    estado: {type: String, enum: ["activo", "inactivo"], default: "inactivo"},
});

module.exports = mongoose.model("Anuncio", anuncioSchema);
