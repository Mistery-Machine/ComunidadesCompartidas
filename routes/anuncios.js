const express = require("express");
const router = express.Router();
const Anuncio = require("../models/Anuncio");

// Obtener todos los anuncios
router.get("/", async (req, res) => {
  try {
    const anuncios = await Anuncio.find();
    res.json(anuncios);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener anuncios" });
  }
});

// Crear un nuevo anuncio
router.post("/", async (req, res) => {
  try {
    const nuevo = new Anuncio(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al crear anuncio" });
  }
});

// Actualizar un anuncio
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Anuncio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al actualizar anuncio" });
  }
});

// Eliminar un anuncio
router.delete("/:id", async (req, res) => {
  try {
    await Anuncio.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Anuncio eliminado" });
  } catch (err) {
    res.status(400).json({ mensaje: "Error al eliminar anuncio" });
  }
});

module.exports = router;
