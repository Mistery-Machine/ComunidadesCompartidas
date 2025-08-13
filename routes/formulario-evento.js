const servicioEvento = require("../services/servicioEvento");
const {requireAdmin} = require("../middleware/auth");

const eventoFormulario = (app) => {
    app.post("/crear-evento", requireAdmin, async (req, res) => {
        console.log("Datos recibidos:", req.body);

        // Validar que los datos requeridos estén presentes
        if (
            !req.body.titulo ||
            !req.body.categoria ||
            !req.body.ubicacion ||
            !req.body.organizador ||
            !req.body.telefono ||
            !req.body.fechaEvento
        ) {
            res.render("formulario-error", {
                headline: "Datos incompletos",
                message: "Todos los campos son obligatorios",
                message_secundario:
                    "Por favor completa todos los campos del formulario",
            });
            return;
        }

        const datosEvento = {
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            fechaGeneracion: new Date().toLocaleDateString(),
            ubicacion: req.body.ubicacion,
            organizador: req.body.organizador,
            telefono: req.body.telefono,
            fechaEvento: req.body.fechaEvento,
            estado: "activo",
        };

        const resultado = await servicioEvento.crear(datosEvento);

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
                headline: "Evento creado con éxito",
                message:
                    "Tu evento ha sido registrado correctamente y aparecerá en el calendario.",
                message_secundario:
                    "Los usuarios podrán ver tu evento en la sección de calendario.",
            });
        }
    });
};

module.exports = eventoFormulario;
