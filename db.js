//Utilizar mongoose
const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://sysadmin:cenfotec@comunidadescompartidas.ecw98qk.mongodb.net/?retryWrites=true&w=majority&appName=ComunidadesCompartidas";

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
