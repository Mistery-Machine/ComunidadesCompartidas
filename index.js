//Utilizar express
//require("./db.js");
const express = require("express");

const app = express();

const path = require("path");

app.set("views", path.join(__dirname, "views")); //Le decimos a express donde están nuestras vistas
app.engine("html", require("ejs").renderFile); //html usando ejs
app.set("view engine", "ejs"); //configurando ejs como el motor de plantillas predeterminado

//res.render('nombre')

//Archivos Staticos
app.use(express.static(path.join(__dirname, "public")));

//Encender el servidor
app.listen(3000, () => {
  console.log("Se conecto el puerto");
});

// RUTAS
app.get("/", (req, res) => {
  res.render("index.html");
});
