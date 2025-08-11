const servicioRuta = require("../services/servicioRuta");
const { requireAdmin } = require("../middleware/auth");

const rutaFormulario = (app) => {
  app.post("/crear-ruta", requireAdmin, async (req, res) => {
    const datosRuta = {
      numeroRuta: req.body.numeroRuta,
      recorrido: req.body.recorrido,
      horarioLunVie: req.body.horarioLunVie,
      horarioSabado: req.body.horarioSabado,
      horarioDomingo: req.body.horarioDomingo,
      frecuencia: req.body.frecuencia,
      estado: req.body.estado,
      fechaRegistro: new Date().toLocaleDateString(),
    };

    const resultado = await servicioRuta.crear(datosRuta);

    if (!resultado.exito) {
      res.render("formulario-error", {
        headline: "Ha ocurrido un error",
        message: resultado.data,
        message_secundario:
          "Por favor verifica la consola para determinar que ocurre",
      });
      return;
    } else {
      res.render("formulario-exito", {
        headline: "Ruta creada con éxito",
        message: "La ruta ha sido registrada correctamente.",
        message_secundario:
          "La ruta ya está disponible en el listado de rutas.",
      });
    }
  });
};

module.exports = rutaFormulario;
