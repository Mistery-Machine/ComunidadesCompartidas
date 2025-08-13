const express = require("express");
const cors = require("cors");
const Usuario = require("./models/Usuario");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/registro", async (req, res) => {
    try {
        const {nombre, correo, contrasena, rol, fechaNacimiento, telefono} = req.body;

        if (!nombre || nombre.length < 3) return res.status(400).json({error: "Nombre inválido"});
        if (!correo || !correo.includes("@")) return res.status(400).json({error: "Correo inválido"});
        if (!contrasena || contrasena.length < 8) return res.status(400).json({error: "Contraseña inválida"});
        if (!rol || !["administrador", "usuario"].includes(rol)) return res.status(400).json({error: "Rol inválido"});
        if (!fechaNacimiento) return res.status(400).json({error: "Fecha de nacimiento requerida"});
        if (!telefono || !/^\d{8}$/.test(telefono)) return res.status(400).json({error: "Teléfono inválido"});

        const existe = await Usuario.findOne({correo});
        if (existe) return res.status(409).json({error: "Correo ya registrado"});

        const usuario = new Usuario({nombre, correo, contrasena, rol, fechaNacimiento, telefono});
        await usuario.save();

        res.json({mensaje: "Registro exitoso"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error en el servidor"});
    }
});
