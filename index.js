//Cargar variables de entorno
require("dotenv").config();

//Utilizar express
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const {
  addUserToViews,
  requireAuth,
  requireAdmin,
} = require("./middleware/auth");

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configurar express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "tu-clave-secreta-muy-segura-aqui",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Middleware para pasar información del usuario a todas las vistas
app.use(addUserToViews);

// Rutas de autenticación
app.use("/", require("./routes/auth"));

const rutaFormularioEmprendimiento = require("./routes/formulario-emprendimiento");
const rutaEmprendimientos = require("./routes/emprendimientos");
const rutaFormulario = require("./routes/formulario-ruta");
const rutasLista = require("./routes/rutas");
const eventoFormulario = require("./routes/formulario-evento");
const rutaEventos = require("./routes/eventos");

// RUTAS
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/calendario", requireAuth, (req, res) => {
  res.render("calendario");
});

app.get("/dashboard", requireAdmin, async (req, res) => {
  try {
    const Anuncio = require("./models/modeloAnuncio");
    const eventoModel = require("./models/modeloEvento");
    const emprendimientoModel = require("./models/modeloEmprendimiento");

    const anuncios = await Anuncio.find().sort({ fecha: -1 });
    const eventos = await eventoModel.find().sort({ fechaGeneracion: -1 });
    const emprendimientos = await emprendimientoModel.find().sort({ _id: -1 });

    res.render("dashboard", {
      anuncios,
      eventos,
      emprendimientos,
    });
  } catch (error) {
    console.error("Error al cargar dashboard:", error);
    res.render("dashboard", {
      anuncios: [],
      eventos: [],
      emprendimientos: [],
    });
  }
});

// Rutas del dashboard
app.use("/dashboard", require("./routes/dashboard"));

rutaFormularioEmprendimiento.emprendimiento(app);
rutaFormularioEmprendimiento.formularioEmprendimiento(app);

rutaEmprendimientos.emprendimientoLista(app);
rutaEmprendimientos.emprendimientoId(app);

rutaEventos.eventosLista(app);
rutaEventos.paginaEventos(app);
rutaEventos.formularioEventos(app);

rutaFormulario(app);
rutasLista(app);
eventoFormulario(app);

app.get("/formulario-ruta", requireAdmin, (req, res) => {
  res.render("formularioRuta");
});

// Ruta manejada por rutasLista

app.get("/login", (req, res) => {
  if (req.session.usuario) {
    return res.redirect("/dashboard");
  }
  res.render("login");
});

app.get("/mapa", (req, res) => {
  res.render("mapa", {
    googleApiKey: process.env.GOOGLE_API_KEY_MAP,
  });
});

app.get("/register", (req, res) => {
  if (req.session.usuario) {
    return res.redirect("/dashboard");
  }
  res.render("register");
});

app.get("/reportes", requireAdmin, (req, res) => {
  res.render("reportes");
});

app.get("/ver-reportes", requireAdmin, (req, res) => {
  res.render("verReportes");
});

app.get("/formulario-exito", (req, res) => {
  res.render("formulario-exito");
});

// Rutas de anuncios (protegidas)
app.use("/anuncios", require("./routes/anuncios"));

// Ruta específica para el formulario de anuncio
const rutaFormularioAnuncio = require("./routes/formulario-anuncio");
rutaFormularioAnuncio.formularioAnuncio(app);

const rutasReportes = require("./routes/reportes");
app.use(rutasReportes);
//Encender el servidor
app.listen(3000, () => {
  console.log("Servidor conectado en puerto 3000");
});
