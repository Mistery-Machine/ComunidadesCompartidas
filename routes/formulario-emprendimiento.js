const servicioEmprendimiento = require('../services/servicioEmprendimiento');
const servicioCategorias = require('../services/servicioCategorias');

const emprendimiento = (app) => {
    app.post('/crear-emprendimiento', async (req, res) => {

        const datosEmprendimiento = {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            ubicacion: req.body.ubicacion,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            registro: new Date().toLocaleDateString(), // obtiene fecha del dia de hoy 
            estado: false,  // no es visible todavia     
        }

        const resultado = await servicioEmprendimiento.crear(datosEmprendimiento);

        if (!resultado.exito) {
            res.render('formulario-error', {
                headline: "Ha ocurrido un error",
                message: resultado.data,
                message_secundario: "Por favor verifica la consola para determinar que ocurre"
            })
            return;
        } else {
            res.render('formulario-exito', {
                headline: "Emprendimiento creado con éxito",
                message: "Tu emprendimiento ha sido registrado correctamente y está en proceso de aprobación.",
                message_secundario: "El emprendimiento será visible en la pestaña de emprendimientos una vez sea aprobado."
            });
        }
    });
}

const formularioEmprendimiento = (app) => {

    app.get('/formulario-emprendimiento', async (req, res) => {
        const resultado = await servicioCategorias.obtenerCategoriaEmprendimientos();
        res.render('formulario-emprendimiento', {categorias: resultado.data});
    });

}

module.exports = {formularioEmprendimiento, emprendimiento};