
const emprendimiento = (app) => {
    app.post('/crear-emprendimiento', (req, res) => {
        console.log('req.body:', req.body); // Para debuggear
        const datosEmprendimiento = {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            ubicacion: req.body.ubicacion,
            categoria: req.body.categoria, 
            descripcion: req.body.descripcion,
            registro: req.body.fecha, 
            estado: req.body.estado,       
        }
        // código para reenviar 

        res.render('formulario-exito', { 
            headline: "Emprendimiento creado con éxito",
            message: "Tu emprendimiento ha sido registrado correctamente y está en proceso de aprobación.",
            message_secundario: "El emprendimiento será visible en la pestaña de emprendimientos una vez sea aprobado."

        });
    });

}

module.exports = emprendimiento;