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
  res.render("index");
});

app.get("/anuncios", (req, res) => {
  res.render("anuncios");
});

app.get("/calendario", (req, res) => {
  res.render("calendario");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/emprendimientos", (req, res) => {
  res.render("emprendimientos");
});

app.get("/eventos", (req, res) => {
  res.render("eventos");
});

app.get("/formulario-anuncio", (req, res) => {
  res.render("formulario-anuncio");
});

app.get("/formulario-eventos", (req, res) => {
  res.render("formulario-eventos");
});

app.get("/formulario-emprendimiento", (req, res) => {
  res.render("formularioEmprendimiento");
});

app.get("/formulario-ofertas", (req, res) => {
  res.render("formularioOfertas");
});

app.get("/formulario-ruta", (req, res) => {
  res.render("formularioRuta");
});

app.get("/listado-rutas", (req, res) => {
  res.render("listadoRutas");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/mapa", (req, res) => {
  res.render("mapa");
});

app.get("/pagina-eventos", (req, res) => {
  res.render("paginaEventos");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/reportes", (req, res) => {
  res.render("reportes");
});

app.get("/ruta", (req, res) => {
  res.render("ruta");
});

app.get("/ver-reportes", (req, res) => {
  res.render("verReportes");
});

app.get("/formulario-exito", (req, res) => {
  res.render("formulario-exito");
});




















