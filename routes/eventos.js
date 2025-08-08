const servicioEvento = require("../services/servicioEvento");
const servicioCategorias = require("../services/servicioCategorias");

const eventosLista = (app) => {
  // READ - Obtener todos los eventos
  app.get("/listado-eventos", async (req, res) => {
    const eventos = await servicioEvento.obtenerTodos();
    if (eventos.exito) {
      res.render("eventos", { eventos: eventos.data});
    } else {
      res.render("formulario-error", {
        headline: "Ha ocurrido un error",
        message: eventos.data,
        message_secundario:
          "Por favor verifica la consola para determinar que ocurre",
      });
    }
  });

  // READ - Obtener un evento específico para editar
  app.get("/editar-evento/:id", async (req, res) => {
    const resultado = await servicioEvento.obtenerPorId(req.params.id);
    const categorias = await servicioCategorias.obtenerCategoriaEventos();

    if (resultado.exito) {
      res.render("formularioEvento", {
        evento: resultado.data,
        esEdicion: true,
        categorias: categorias.data
      });
    } else {
      res.render("formulario-error", {
        headline: "Evento no encontrado",
        message: resultado.data,
        message_secundario: "El evento que intentas editar no existe",
      });
    }
  });

  // UPDATE - Actualizar un evento
  app.post("/actualizar-evento/:id", async (req, res) => {
    const datosEvento = {
      titulo: req.body.titulo,
      categoria: req.body.categoria,
      ubicacion: req.body.ubicacion,
      organizador: req.body.organizador,
      fechaEvento: req.body.fechaEvento,
    };

    const resultado = await servicioEvento.actualizar(
      req.params.id,
      datosEvento
    );

    if (!resultado.exito) {
      res.render("formulario-error", {
        headline: "Error al actualizar",
        message: resultado.data,
        message_secundario: "No se pudo actualizar el evento",
      });
    } else {
      res.render("formulario-exito", {
        headline: "Evento actualizado con éxito",
        message: "Los cambios han sido guardados correctamente.",
        message_secundario: "El evento ha sido actualizado en el sistema.",
      });
    }
  });

  // DELETE - Eliminar un evento
  app.post("/eliminar-evento/:id", async (req, res) => {
    const resultado = await servicioEvento.eliminar(req.params.id);

    if (!resultado.exito) {
      res.render("formulario-error", {
        headline: "Error al eliminar",
        message: resultado.data,
        message_secundario: "No se pudo eliminar el evento",
      });
    } else {
      res.render("formulario-exito", {
        headline: "Evento eliminado con éxito",
        message: "El evento ha sido eliminado del sistema.",
        message_secundario: "El evento ya no aparecerá en el listado.",
      });
    }
  });

  // READ - Ver un evento específico
  app.get("/evento/:id", async (req, res) => {
    const resultado = await servicioEvento.obtenerPorId(req.params.id);
    if (resultado.exito) {
      res.render("evento", { evento: resultado.data });
    } else {
      res.render("formulario-error", {
        headline: "Evento no encontrado",
        message: resultado.data,
        message_secundario: "El evento que intentas ver no existe",
      });
    }
  });

  // API endpoints para operaciones AJAX
  app.get("/api/eventos", async (req, res) => {
    const eventos = await servicioEvento.obtenerTodos();
    res.json(eventos);
  });

  app.get("/api/eventos/:id", async (req, res) => {
    const evento = await servicioEvento.obtenerPorId(req.params.id);
    res.json(evento);
  });

  // API endpoint para eventos por mes (para el calendario)
  app.get("/api/eventos/mes/:mes/:año", async (req, res) => {
    const { mes, año } = req.params;
    const eventos = await servicioEvento.obtenerPorMes(
      parseInt(mes),
      parseInt(año)
    );
    res.json(eventos);
  });
};

const paginaEventos = (app) => {
  app.get("/pagina-eventos", async (req, res) => {
      const categorias = await servicioCategorias.obtenerCategoriaEventos();
      const eventos = await servicioEvento.obtenerTodos();
      if (eventos.exito) {
        res.render("paginaEventos", { eventos: eventos.data, categorias: categorias.data });
      } else {
        res.render("paginaEventos", { eventos: [] });
      }
  });
}

const formularioEventos = (app) => {
    app.get("/formulario-eventos", async (req, res) => {
        const categorias = await servicioCategorias.obtenerCategoriaEventos();
        res.render("formularioEvento", { esEdicion: false, categorias: categorias.data });
    });
}

module.exports = { eventosLista, paginaEventos, formularioEventos };
