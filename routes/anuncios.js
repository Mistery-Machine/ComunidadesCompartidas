const express = require("express");
const router = express.Router();
const Anuncio = require("../models/modeloAnuncio");
const servicioCategorias = require("../services/servicioCategorias");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// Obtener todos los anuncios (vista)
router.get("/", async (req, res) => {
  try {
    const anuncios = await Anuncio.find({ estado: "activo" }).sort({
      fecha: -1,
    });
    const categorias = await servicioCategorias.obtenerCategoriaAnuncios();
    res.render("anuncios", { anuncios, categorias: categorias.data });
  } catch (err) {
    console.error("Error al obtener anuncios:", err);
    res.render("anuncios", { anuncios: [] });
  }
});

// Crear un nuevo anuncio (solo usuarios autenticados)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { titulo, descripcion, fecha, categoria } = req.body;

    const nuevoAnuncio = new Anuncio({
      titulo,
      descripcion,
      categoria,
      fecha: fecha || new Date(),
    });

    await nuevoAnuncio.save();
    res.redirect("/anuncios");
  } catch (err) {
    console.error("Error al crear anuncio:", err);
    res.render("formulario-error", {
      mensaje: "Error al crear el anuncio. Por favor, intenta de nuevo.",
    });
  }
});

// API endpoints para obtener anuncios en JSON
router.get("/api", async (req, res) => {
  try {
    const anuncios = await Anuncio.find({ estado: "activo" }).sort({
      fecha: -1,
    });
    res.json(anuncios);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener anuncios" });
  }
});

// Actualizar un anuncio (solo administradores)
router.put("/:id", requireAdmin, async (req, res) => {
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

// Eliminar un anuncio (solo administradores)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await Anuncio.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Anuncio eliminado" });
  } catch (err) {
    res.status(400).json({ mensaje: "Error al eliminar anuncio" });
  }
});

module.exports = router;
