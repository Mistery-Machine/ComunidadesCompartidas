const mongoose = require("mongoose");

const anuncioSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    categoria: String,
    fecha: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Anuncio", anuncioSchema);
