const eventoModel = require("../models/modeloEvento");

const crear = async (datosEvento) => {
  try {
    const nuevo = new eventoModel(datosEvento);
    const guardar = await nuevo.save();
    return { exito: true, data: guardar };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const obtenerTodos = async () => {
  try {
    const listaEventos = await eventoModel.find({ estado: "activo" });
    return { exito: true, data: listaEventos };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const obtenerTodosParaAdmin = async () => {
  try {
    const listaEventos = await eventoModel.find();
    return { exito: true, data: listaEventos };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const obtenerPorId = async (id) => {
  try {
    const evento = await eventoModel.findById(id);
    if (!evento) {
      return { exito: false, data: "Evento no encontrado" };
    }
    return { exito: true, data: evento };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const actualizar = async (id, datosEvento) => {
  try {
    const eventoActualizado = await eventoModel.findByIdAndUpdate(
      id,
      datosEvento,
      {
        new: true,
      }
    );
    if (!eventoActualizado) {
      return { exito: false, data: "Evento no encontrado" };
    }
    return { exito: true, data: eventoActualizado };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const eliminar = async (id) => {
  try {
    const eventoEliminado = await eventoModel.findByIdAndUpdate(
      id,
      { estado: "inactivo" },
      { new: true }
    );
    if (!eventoEliminado) {
      return { exito: false, data: "Evento no encontrado" };
    }
    return { exito: true, data: eventoEliminado };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const obtenerPorMes = async (mes, año) => {
  try {
    const inicioMes = new Date(año, mes - 1, 1);
    const finMes = new Date(año, mes, 0);

    const eventos = await eventoModel.find({
      estado: "activo",
      fechaEvento: {
        $gte: inicioMes.toISOString().split("T")[0],
        $lte: finMes.toISOString().split("T")[0],
      },
    });
    return { exito: true, data: eventos };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerTodosParaAdmin,
  obtenerPorId,
  actualizar,
  eliminar,
  obtenerPorMes,
};
