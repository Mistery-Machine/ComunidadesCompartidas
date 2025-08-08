const mongoose = require('../db');

const categoriaSchema = mongoose.Schema({
   emprendimientos: {
       type: String,
       enum: ['Tecnología', 'Alimentación', 'Artesanías', 'Servicios', 'Textil', 
              'Agricultura', 'Belleza', 'Educación', 'Entretenimiento', 'Salud']
   },
   eventos: {
       type: String,
       enum: ['Conferencias', 'Talleres', 'Networking', 'Cultural', 'Deportivo',
              'Educativo', 'Social', 'Empresarial', 'Académico', 'Recreativo']
   },
   anuncios: {
       type: String,
       enum: ['Retail', 'Consultoría', 'Manufactura', 'Turismo', 'Restaurante',
              'Transporte', 'Inmobiliaria', 'Financiero', 'Legal', 'Marketing']
   },
   activa: String
}, {versionKey: false});

const categoriaModel = mongoose.model('categorias', categoriaSchema);

module.exports = categoriaModel;