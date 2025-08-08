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
       const categorias = await categoriaModel.find({ eventos: { $exists: true } });
       return { exito: true, data: categorias }
   } catch (error) {
       return { exito: false, data: error.message }
   }
}

const obtenerCategoriaAnuncios = async () => {
   try {
       const categorias = await categoriaModel.find({ anuncios: { $exists: true } });
       return { exito: true, data: categorias }
   } catch (error) {
       return { exito: false, data: error.message }
   }
}

module.exports = { obtenerCategoriaEmprendimientos, obtenerCategoriaEventos, obtenerCategoriaAnuncios }