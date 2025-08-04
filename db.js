//Utilizar mongoose
const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/ComunidadesCompartidas"; // Cambia esto por tu URI de MongoDB

//Conectar a la base de datos
mongoose
  .connect(mongoURI, {})
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

//Verificar la conexión
mongoose.connection.on("connected", () => {
  console.log("Conectado a la base de datos");
});

module.exports = mongoose;
