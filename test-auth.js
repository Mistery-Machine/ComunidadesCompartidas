// Script de prueba para verificar la autenticación
const bcrypt = require("bcrypt");
const Usuario = require("./models/modeloUsuario");
const mongoose = require("./db");

async function crearUsuariosPrueba() {
  try {
    // Crear un administrador de prueba
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = new Usuario({
      nombre: "Administrador",
      correo: "admin@test.com",
      contrasena: adminPassword,
      rol: "administrador",
      fechaNacimiento: new Date("1990-01-01"),
      telefono: "12345678",
    });

    // Crear un cliente de prueba
    const clientePassword = await bcrypt.hash("cliente123", 10);
    const cliente = new Usuario({
      nombre: "Cliente Prueba",
      correo: "cliente@test.com",
      contrasena: clientePassword,
      rol: "cliente",
      fechaNacimiento: new Date("1995-01-01"),
      telefono: "87654321",
    });

    // Verificar si ya existen
    const adminExistente = await Usuario.findOne({ correo: "admin@test.com" });
    const clienteExistente = await Usuario.findOne({
      correo: "cliente@test.com",
    });

    if (!adminExistente) {
      await admin.save();
      console.log("✅ Usuario administrador creado: admin@test.com / admin123");
    } else {
      console.log("ℹ️  Usuario administrador ya existe");
    }

    if (!clienteExistente) {
      await cliente.save();
      console.log("✅ Usuario cliente creado: cliente@test.com / cliente123");
    } else {
      console.log("ℹ️  Usuario cliente ya existe");
    }

    console.log("\n🚀 Usuarios de prueba listos. Puedes usar:");
    console.log("   Admin: admin@test.com / admin123");
    console.log("   Cliente: cliente@test.com / cliente123");
  } catch (error) {
    console.error("❌ Error creando usuarios de prueba:", error);
  } finally {
    mongoose.connection.close();
  }
}

crearUsuariosPrueba();
