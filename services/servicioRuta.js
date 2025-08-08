const rutaModel = require("../models/modeloRuta");

const crear = async (datosRuta) => {
    try {
        const nueva = new rutaModel(datosRuta);
        const guardar = await nueva.save();
        return {exito: true, data: guardar};
    } catch (error) {
        return {exito: false, data: error.message};
    }
};

const obtenerTodas = async () => {
    try {
        const listaRutas = await rutaModel.find();
        return {exito: true, data: listaRutas};
    } catch (error) {
        return {exito: false, data: error.message};
    }
};

const obtenerPorId = async (id) => {
    try {
        const ruta = await rutaModel.findById(id);
        if (!ruta) {
            return {exito: false, data: "Ruta no encontrada"};
        }
        return {exito: true, data: ruta};
    } catch (error) {
        return {exito: false, data: error.message};
    }
};

const actualizar = async (id, datosRuta) => {
    try {
        const rutaActualizada = await rutaModel.findByIdAndUpdate(id, datosRuta, {
            new: true,
        });
        if (!rutaActualizada) {
            return {exito: false, data: "Ruta no encontrada"};
        }
        return {exito: true, data: rutaActualizada};
    } catch (error) {
        return {exito: false, data: error.message};
    }
};

const eliminar = async (id) => {
    try {
        const rutaEliminada = await rutaModel.findByIdAndDelete(id);
        if (!rutaEliminada) {
            return {exito: false, data: "Ruta no encontrada"};
        }
        return {exito: true, data: rutaEliminada};
    } catch (error) {
        return {exito: false, data: error.message};
    }
};

module.exports = {crear, obtenerTodas, obtenerPorId, actualizar, eliminar};
