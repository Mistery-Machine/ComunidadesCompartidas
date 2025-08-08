const servicioRuta = require("../services/servicioRuta");

const rutasLista = (app) => {
    // READ - Obtener todas las rutas
    app.get("/listado-rutas", async (req, res) => {
        const rutas = await servicioRuta.obtenerTodas();
        if (rutas.exito) {
            res.render("listadoRutas", {rutas: rutas.data});
        } else {
            res.render("formulario-error", {
                headline: "Ha ocurrido un error",
                message: rutas.data,
                message_secundario:
                    "Por favor verifica la consola para determinar que ocurre",
            });
        }
    });

    // READ - Obtener una ruta específica para editar
    app.get("/editar-ruta/:id", async (req, res) => {
        const resultado = await servicioRuta.obtenerPorId(req.params.id);
        if (resultado.exito) {
            res.render("formularioRuta", {
                ruta: resultado.data,
                esEdicion: true,
            });
        } else {
            res.render("formulario-error", {
                headline: "Ruta no encontrada",
                message: resultado.data,
                message_secundario: "La ruta que intentas editar no existe",
            });
        }
    });

    // UPDATE - Actualizar una ruta
    app.post("/actualizar-ruta/:id", async (req, res) => {
        const datosRuta = {
            numeroRuta: req.body.numeroRuta,
            recorrido: req.body.recorrido,
            horarioLunVie: req.body.horarioLunVie,
            horarioSabado: req.body.horarioSabado,
            horarioDomingo: req.body.horarioDomingo,
            frecuencia: req.body.frecuencia,
            estado: req.body.estado,
        };

        const resultado = await servicioRuta.actualizar(req.params.id, datosRuta);

        if (!resultado.exito) {
            res.render("formulario-error", {
                headline: "Error al actualizar",
                message: resultado.data,
                message_secundario: "No se pudo actualizar la ruta",
            });
        } else {
            res.render("formulario-exito", {
                headline: "Ruta actualizada con éxito",
                message: "Los cambios han sido guardados correctamente.",
                message_secundario: "La ruta ha sido actualizada en el sistema.",
            });
        }
    });

    // DELETE - Eliminar una ruta
    app.post("/eliminar-ruta/:id", async (req, res) => {
        const resultado = await servicioRuta.eliminar(req.params.id);

        if (!resultado.exito) {
            res.render("formulario-error", {
                headline: "Error al eliminar",
                message: resultado.data,
                message_secundario: "No se pudo eliminar la ruta",
            });
        } else {
            res.render("formulario-exito", {
                headline: "Ruta eliminada con éxito",
                message: "La ruta ha sido eliminada del sistema.",
                message_secundario: "La ruta ya no aparecerá en el listado.",
            });
        }
    });

    // READ - Ver una ruta específica
    app.get("/ruta/:id", async (req, res) => {
        const resultado = await servicioRuta.obtenerPorId(req.params.id);
        if (resultado.exito) {
            res.render("ruta", {ruta: resultado.data});
        } else {
            res.render("formulario-error", {
                headline: "Ruta no encontrada",
                message: resultado.data,
                message_secundario: "La ruta que intentas ver no existe",
            });
        }
    });

    // API endpoints para operaciones AJAX
    app.get("/api/rutas", async (req, res) => {
        const rutas = await servicioRuta.obtenerTodas();
        res.json(rutas);
    });

    app.get("/api/rutas/:id", async (req, res) => {
        const ruta = await servicioRuta.obtenerPorId(req.params.id);
        res.json(ruta);
    });
};

module.exports = rutasLista;
