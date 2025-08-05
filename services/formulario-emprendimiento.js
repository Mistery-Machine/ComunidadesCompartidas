const emprendimientoModel = require('../models/formulario-emprendimiento');

const crear = async (datosEmprendimiento) => {
    try {
        const nuevo = new emprendimientoModel(datosEmprendimiento);
        const guardar = await nuevo.save();
        return { exito: true, data: guardar} // el empnredimiento se guardo sin problemas
    } catch (error) {
        return { exito: false, data: error.message }; // algo exploto 
    }
}

const obtenerTodos = async () => {
    try {
        const listaEmprendimientos = await Emprendimiento.find();
        return { exito: true, data: listaEmprendimientos } 
    } catch (error) {
        return { exito: false, data: error.message }
    }
}

module.exports = { crear, obtenerTodos }