const emprendimientoModel = require('../models/modeloEmprendimiento');

const crear = async (datosEmprendimiento) => {
    try {
        const nuevo = new emprendimientoModel(datosEmprendimiento);
        const guardar = await nuevo.save();
        return {exito: true, data: guardar} // el empnredimiento se guardo sin problemas
    } catch (error) {
        return {exito: false, data: error.message}; // algo exploto
    }
}

const obtenerTodos = async () => {
    try {
        const listaEmprendimientos = await emprendimientoModel.find();
        return {exito: true, data: listaEmprendimientos}
    } catch (error) {
        return {exito: false, data: error.message}
    }
}

const obtenerPorId = async (id) => {
    try {
        const unicoEmprendimiento = await emprendimientoModel.findById(id);
        return {exito: true, data: unicoEmprendimiento}
    } catch (error) {
        return {exito: false, data: error.message}
    }
}

module.exports = {crear, obtenerTodos, obtenerPorId}