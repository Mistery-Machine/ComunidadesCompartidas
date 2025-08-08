const mongoose = require('../db');

const categoriaSchema = mongoose.Schema({
    emprendimientos: {
        type: String,
        enum: ['Tecnología', 'Alimentación', 'Hogar', 'Servicios',
            'Agricultura', 'Educación', 'Entretenimiento', 'Salud']
    },
    eventos: {
        type: String,
        enum: ['Conferencias', 'Talleres', 'Cultural', 'Deportivo',
            'Educativo', 'Social', 'Empresarial', 'Académico']
    },
    anuncios: {
        type: String,
        enum: ['Avisos', 'Ofertas', 'Descuentos', 'Promociones',
            'Nuevos', 'Horarios', 'Ubicación', 'General']
    },
    activa: String
}, {versionKey: false});

const categoriaModel = mongoose.model('categorias', categoriaSchema);

module.exports = categoriaModel;