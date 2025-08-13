const express = require("express");
const router = express.Router();
const Anuncio = require("../models/modeloAnuncio");
const servicioCategorias = require("../services/servicioCategorias");
const {
  requireAuth,
  requireAdmin,
  requireEmprendedorOrAdmin,
} = require("../middleware/auth");

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

// Crear un nuevo anuncio (emprendedores y administradores)
router.post("/", requireEmprendedorOrAdmin, async (req, res) => {
  try {
    const { titulo, descripcion, fecha, categoria } = req.body;

    // Los emprendedores siempre crean en estado inactivo, los admins pueden crear activo
    const esEmprendedor = req.session.usuario.rol === "emprendedor";

    const nuevoAnuncio = new Anuncio({
      titulo,
      descripcion,
      categoria,
      fecha: fecha || new Date(),
      estado: esEmprendedor ? "inactivo" : req.body.estado || "activo",
    });

    await nuevoAnuncio.save();

    if (esEmprendedor) {
      res.render("formulario-exito", {
        headline: "Anuncio creado con éxito",
        message:
          "Tu anuncio ha sido registrado correctamente y está en proceso de aprobación.",
        message_secundario:
          "El anuncio será visible una vez sea aprobado por un administrador.",
      });
    } else {
      res.redirect("/anuncios");
    }
  } catch (err) {
    console.error("Error al crear anuncio:", err);
    res.render("formulario-error", {
      headline: "Error al crear anuncio",
      message: "Error al crear el anuncio. Por favor, intenta de nuevo.",
      message_secundario: "Si el problema persiste, contacta al administrador.",
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
