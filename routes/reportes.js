const express = require("express");
const router = express.Router();
const Reporte = require("../models/Reporte");

// Obtener todos los reportes y sugerencias
router.get("/api/reportes", async (req, res) => {
  try {
    const reportes = await Reporte.find();
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener reportes" });
  }
});

// Crear un nuevo reporte o sugerencia
router.post("/api/reportes", async (req, res) => {
  try {
    const nuevo = new Reporte(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al crear reporte" });
  }
});

// Actualizar un reporte
router.put("/api/reportes/:id", async (req, res) => {
  try {
    const actualizado = await Reporte.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al actualizar reporte" });
  }
});

// Eliminar un reporte
router.delete("/api/reportes/:id", async (req, res) => {
  try {
    await Reporte.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reporte eliminado" });
  } catch (err) {
    res.status(400).json({ mensaje: "Error al eliminar reporte" });
  }
});

module.exports = router;
