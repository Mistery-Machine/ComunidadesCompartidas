const express = require("express");
const router = express.Router();
const Anuncio = require("../models/modeloAnuncio");
const eventoModel = require("../models/modeloEvento");
const emprendimientoModel = require("../models/modeloEmprendimiento");
const { requireAdmin } = require("../middleware/auth");

// Obtener todos los elementos para el dashboard
router.get("/data", requireAdmin, async (req, res) => {
  try {
    const anuncios = await Anuncio.find().sort({ fecha: -1 });
    const eventos = await eventoModel.find().sort({ fechaGeneracion: -1 });
    const emprendimientos = await emprendimientoModel.find().sort({ _id: -1 });

    res.json({
      anuncios,
      eventos,
      emprendimientos,
    });
  } catch (error) {
    console.error("Error al obtener datos del dashboard:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

// Cambiar estado de anuncio
router.patch("/anuncio/:id/estado", requireAdmin, async (req, res) => {
  try {
    const { estado } = req.body;
    const anuncio = await Anuncio.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!anuncio) {
      return res.status(404).json({ error: "Anuncio no encontrado" });
    }

    res.json({ success: true, anuncio });
  } catch (error) {
    console.error("Error al actualizar estado del anuncio:", error);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

// Cambiar estado de evento
router.patch("/evento/:id/estado", requireAdmin, async (req, res) => {
  try {
    const { estado } = req.body;
    const evento = await eventoModel.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json({ success: true, evento });
  } catch (error) {
    console.error("Error al actualizar estado del evento:", error);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

// Cambiar estado de emprendimiento
router.patch("/emprendimiento/:id/estado", requireAdmin, async (req, res) => {
  try {
    const { estado } = req.body;
    const emprendimiento = await emprendimientoModel.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!emprendimiento) {
      return res.status(404).json({ error: "Emprendimiento no encontrado" });
    }

    res.json({ success: true, emprendimiento });
  } catch (error) {
    console.error("Error al actualizar estado del emprendimiento:", error);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

module.exports = router;
