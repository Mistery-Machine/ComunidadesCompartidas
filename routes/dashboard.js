const express = require("express");
const router = express.Router();
const Anuncio = require("../models/modeloAnuncio");
const eventoModel = require("../models/modeloEvento");
const emprendimientoModel = require("../models/modeloEmprendimiento");
const Usuario = require("../models/modeloUsuario");
const Reporte = require("../models/modeloReporte");
const {requireAdmin} = require("../middleware/auth");

// Obtener todos los elementos para el dashboard
router.get("/data", requireAdmin, async (req, res) => {
    try {
        const anuncios = await Anuncio.find().sort({fecha: -1});
        const eventos = await eventoModel.find().sort({fechaGeneracion: -1});
        const emprendimientos = await emprendimientoModel.find().sort({_id: -1});
        const usuarios = await Usuario.find().sort({nombre: 1});

        res.json({
            anuncios,
            eventos,
            emprendimientos,
            usuarios,
        });
    } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
        res.status(500).json({error: "Error al obtener datos"});
    }
});

// Cambiar estado de anuncio
router.patch("/anuncio/:id/estado", requireAdmin, async (req, res) => {
    try {
        const {estado} = req.body;
        const anuncio = await Anuncio.findByIdAndUpdate(
            req.params.id,
            {estado},
            {new: true}
        );

        if (!anuncio) {
            return res.status(404).json({error: "Anuncio no encontrado"});
        }

        res.json({success: true, anuncio});
    } catch (error) {
        console.error("Error al actualizar estado del anuncio:", error);
        res.status(500).json({error: "Error al actualizar estado"});
    }
});

// Cambiar estado de evento
router.patch("/evento/:id/estado", requireAdmin, async (req, res) => {
    try {
        const {estado} = req.body;
        const evento = await eventoModel.findByIdAndUpdate(
            req.params.id,
            {estado},
            {new: true}
        );

        if (!evento) {
            return res.status(404).json({error: "Evento no encontrado"});
        }

        res.json({success: true, evento});
    } catch (error) {
        console.error("Error al actualizar estado del evento:", error);
        res.status(500).json({error: "Error al actualizar estado"});
    }
});

// Cambiar estado de emprendimiento
router.patch("/emprendimiento/:id/estado", requireAdmin, async (req, res) => {
    try {
        const {estado} = req.body;
        const emprendimiento = await emprendimientoModel.findByIdAndUpdate(
            req.params.id,
            {estado},
            {new: true}
        );

        if (!emprendimiento) {
            return res.status(404).json({error: "Emprendimiento no encontrado"});
        }

        res.json({success: true, emprendimiento});
    } catch (error) {
        console.error("Error al actualizar estado del emprendimiento:", error);
        res.status(500).json({error: "Error al actualizar estado"});
    }
});

// Cambiar rol de usuario
router.patch("/usuario/:id/rol", requireAdmin, async (req, res) => {
    try {
        const {rol} = req.body;

        // Validar que el rol sea válido
        if (!["administrador", "cliente", "emprendedor"].includes(rol)) {
            return res.status(400).json({error: "Rol no válido"});
        }

        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            {rol},
            {new: true}
        );

        if (!usuario) {
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        res.json({success: true, usuario});
    } catch (error) {
        console.error("Error al actualizar rol del usuario:", error);
        res.status(500).json({error: "Error al actualizar rol"});
    }
});

// Cambiar estado de reporte
router.patch("/reporte/:id/estado", requireAdmin, async (req, res) => {
    try {
        const {estado} = req.body;

        // Validar que el estado sea válido
        if (!["Pendiente", "En proceso", "Resuelto"].includes(estado)) {
            return res.status(400).json({error: "Estado no válido"});
        }

        const reporte = await Reporte.findByIdAndUpdate(
            req.params.id,
            {estado},
            {new: true}
        );

        if (!reporte) {
            return res.status(404).json({error: "Reporte no encontrado"});
        }

        res.json({success: true, reporte});
    } catch (error) {
        console.error("Error al actualizar estado del reporte:", error);
        res.status(500).json({error: "Error al actualizar estado"});
    }
});

// Eliminar anuncio
router.delete("/anuncio/:id", requireAdmin, async (req, res) => {
    try {
        const anuncio = await Anuncio.findByIdAndDelete(req.params.id);

        if (!anuncio) {
            return res.status(404).json({error: "Anuncio no encontrado"});
        }

        res.json({success: true, message: "Anuncio eliminado correctamente"});
    } catch (error) {
        console.error("Error al eliminar anuncio:", error);
        res.status(500).json({error: "Error al eliminar anuncio"});
    }
});

// Eliminar evento
router.delete("/evento/:id", requireAdmin, async (req, res) => {
    try {
        const evento = await eventoModel.findByIdAndDelete(req.params.id);

        if (!evento) {
            return res.status(404).json({error: "Evento no encontrado"});
        }

        res.json({success: true, message: "Evento eliminado correctamente"});
    } catch (error) {
        console.error("Error al eliminar evento:", error);
        res.status(500).json({error: "Error al eliminar evento"});
    }
});

// Eliminar emprendimiento
router.delete("/emprendimiento/:id", requireAdmin, async (req, res) => {
    try {
        const emprendimiento = await emprendimientoModel.findByIdAndDelete(
            req.params.id
        );

        if (!emprendimiento) {
            return res.status(404).json({error: "Emprendimiento no encontrado"});
        }

        res.json({
            success: true,
            message: "Emprendimiento eliminado correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar emprendimiento:", error);
        res.status(500).json({error: "Error al eliminar emprendimiento"});
    }
});

module.exports = router;
