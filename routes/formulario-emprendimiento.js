const servicioEmprendimiento = require('../services/formulario-emprendimiento');

const emprendimiento = (app) => {
    app.post('/crear-emprendimiento', async (req, res) => {
        
        const datosEmprendimiento = {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            ubicacion: req.body.ubicacion,
            categoria: req.body.categoria, 
            descripcion: req.body.descripcion,
            registro: req.body.fecha, 
            estado: req.body.estado,       
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

module.exports = emprendimiento;