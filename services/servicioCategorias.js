const categoriaModel = require('../models/modeloCategorias');

const obtenerCategoriaEmprendimientos = async () => {
   try {
        const categoriasEnum = categoriaModel.schema.paths.emprendimientos.enumValues;       
        return { exito: true, data: categoriasEnum }
   } catch (error) {
       return { exito: false, data: error.message }
   }
}

const obtenerCategoriaEventos = async () => {
   try {
    const categoriasEnum = categoriaModel.schema.paths.eventos.enumValues;       
       return { exito: true, data: categoriasEnum }
   } catch (error) {
       return { exito: false, data: error.message }
   }
}

const obtenerCategoriaAnuncios = async () => {
   try {
    const categoriasEnum = categoriaModel.schema.paths.anuncios.enumValues;       
       return { exito: true, data: categoriasEnum }
   } catch (error) {
       return { exito: false, data: error.message }
   }
}

module.exports = { obtenerCategoriaEmprendimientos, obtenerCategoriaEventos, obtenerCategoriaAnuncios }