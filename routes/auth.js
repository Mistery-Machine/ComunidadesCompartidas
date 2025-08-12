const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/modeloUsuario");
const router = express.Router();

// Ruta POST para login
router.post("/login", async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.render("login", {
        error: "Correo y contraseña son requeridos",
      });
    }

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.render("login", { error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );
    if (!contrasenaValida) {
      return res.render("login", { error: "Credenciales inválidas" });
    }

    // Crear sesión
    req.session.usuario = {
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    // Redirigir según el rol
    if (usuario.rol === "administrador") {
      res.redirect("/dashboard");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.render("login", { error: "Error interno del servidor" });
  }
});

// Ruta POST para register
router.post("/register", async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol, fechaNacimiento, telefono } =
      req.body;

    // Validaciones
    if (!nombre || nombre.length < 3) {
      return res.render("register", {
        error: "El nombre debe tener al menos 3 caracteres",
      });
    }

    if (!correo || !correo.includes("@")) {
      return res.render("register", { error: "Correo electrónico inválido" });
    }

    if (!contrasena || contrasena.length < 8) {
      return res.render("register", {
        error: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    if (!rol || !["administrador", "cliente"].includes(rol)) {
      return res.render("register", { error: "Rol inválido" });
    }

    if (!fechaNacimiento) {
      return res.render("register", { error: "Fecha de nacimiento requerida" });
    }

    if (!telefono || !/^\d{8}$/.test(telefono)) {
      return res.render("register", {
        error: "El teléfono debe tener exactamente 8 dígitos",
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.render("register", { error: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const contrasenaEncriptada = await bcrypt.hash(contrasena, saltRounds);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena: contrasenaEncriptada,
      rol,
      fechaNacimiento,
      telefono,
    });

    await nuevoUsuario.save();

    // Crear sesión automáticamente
    req.session.usuario = {
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      rol: nuevoUsuario.rol,
    };

    res.render("formulario-exito", {
      usuario: req.session.usuario,
      headline: "Registro Exitoso",
      message: "Te has registrado correctamente",
      message_secundario: "Ahora puedes iniciar sesión. Da click en volver al inicio para ir a la página principal",

    });

  } catch (error) {
    console.error("Error en registro:", error);
    res.render("register", { error: "Error interno del servidor" });
  }
});

// Ruta para logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.redirect("/");
    }
    res.redirect("/login");
  });
});

module.exports = router;
