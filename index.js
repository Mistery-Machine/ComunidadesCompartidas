//Utilizar express
const express = require("express");
const mongoose = require("./db.js");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Encender el servidor
app.listen(3000, () => {
  console.log("Se conecto el puerto");
});

const emprendimiento = require("./routes/formulario-emprendimiento");
const emprendimientoLista = require("./routes/emprendimientos");
const rutaFormulario = require("./routes/formulario-ruta");
const rutasLista = require("./routes/rutas");
const eventoFormulario = require("./routes/formulario-evento");
const eventosLista = require("./routes/eventos");

// RUTAS
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/calendario", (req, res) => {
  res.render("calendario");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

emprendimiento(app);
emprendimientoLista(app);
rutaFormulario(app);
rutasLista(app);
eventoFormulario(app);
eventosLista(app);

app.get("/formulario-eventos", (req, res) => {
  res.render("formularioEvento", { esEdicion: false });
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

// Ruta manejada por rutasLista

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/mapa", (req, res) => {
  res.render("mapa");
});

app.get("/pagina-eventos", async (req, res) => {
  const servicioEvento = require("./services/servicioEvento");
  const eventos = await servicioEvento.obtenerTodos();
  if (eventos.exito) {
    res.render("paginaEventos", { eventos: eventos.data });
  } else {
    res.render("paginaEventos", { eventos: [] });
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/reportes", (req, res) => {
  res.render("reportes");
});

app.get("/ver-reportes", (req, res) => {
  res.render("verReportes");
});

app.get("/formulario-exito", (req, res) => {
  res.render("formulario-exito");
});

// Rutas de anuncios
app.use("/anuncios", require("./routes/anuncios"));

// Ruta específica para el formulario de anuncio
app.get("/formulario-anuncio", (req, res) => {
  res.render("formulario-anuncio");
});

const rutasReportes = require("./routes/reportes");
app.use(rutasReportes);
