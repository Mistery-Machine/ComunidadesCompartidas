const Anuncio = require("../models/modeloAnuncio");

const crear = async (datosAnuncio) => {
  try {
    const nuevo = new Anuncio(datosAnuncio);
    const guardar = await nuevo.save();
    return { exito: true, data: guardar };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const obtenerTodos = async () => {
  try {
    const listaAnuncios = await Anuncio.find({ estado: "activo" }).sort({
      fecha: -1,
    });
    return { exito: true, data: listaAnuncios };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const obtenerTodosParaAdmin = async () => {
  try {
    const listaAnuncios = await Anuncio.find().sort({ fecha: -1 });
    return { exito: true, data: listaAnuncios };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const obtenerPorId = async (id) => {
  try {
    const anuncio = await Anuncio.findById(id);
    if (!anuncio) {
      return { exito: false, data: "Anuncio no encontrado" };
    }
    return { exito: true, data: anuncio };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const actualizar = async (id, datosAnuncio) => {
  try {
    const anuncioActualizado = await Anuncio.findByIdAndUpdate(
      id,
      datosAnuncio,
      { new: true }
    );
    if (!anuncioActualizado) {
      return { exito: false, data: "Anuncio no encontrado" };
    }
    return { exito: true, data: anuncioActualizado };
  } catch (error) {
    return { exito: false, data: error.message };
  }
};

const eliminar = async (id) => {
  try {
    const anuncioEliminado = await Anuncio.findByIdAndUpdate(
      id,
      { estado: "inactivo" },
      { new: true }
    );
    if (!anuncioEliminado) {
      return { exito: false, data: "Anuncio no encontrado" };
    }
    return { exito: true, data: anuncioEliminado };
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
};
