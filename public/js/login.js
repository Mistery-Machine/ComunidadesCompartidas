const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = "mongodb+srv://sysadmin:cenfotec@comunidadescompartidas.ecw98qk.mongodb.net/?retryWrites=true&w=majority&appName=ComunidadesCompartidas";
mongoose.connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB con Mongoose"))
  .catch(err => console.error("Error en conexión:", err));


const usuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});
const Usuario = mongoose.model("Usuario", usuarioSchema);


app.use(express.static(path.join(__dirname, "public"))); 



app.post("/usuario", async (req, res) => {
  const { correo, contrasena, accion } = req.body;

  try {
    if (accion === "Iniciar Sesion") {
      const usuario = await Usuario.findOne({ correo, contrasena });
      if (usuario) {
        res.send(`<h2>Bienvenido ${correo}</h2>`);
      } else {
        res.send("<h2>Correo o contraseña incorrectos</h2>");
      }
    } else if (accion === "Registrarse") {
      const existe = await Usuario.findOne({ correo });
      if (existe) {
        res.send("<h2>El correo ya está registrado</h2>");
      } else {
        const nuevoUsuario = new Usuario({ correo, contrasena });
        await nuevoUsuario.save();
        res.send("<h2>Registro exitoso</h2>");
      }
    } else {
      res.send("<h2>Acción no válida</h2>");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("<h2>Error del servidor</h2>");
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
