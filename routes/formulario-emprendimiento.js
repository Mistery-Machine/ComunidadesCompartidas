const emprendimiento = (app) => {
    app.post('/crear-emprendimiento', (req, res) => {
        emprendimiento = {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            ubicacion: req.body.ubicacion,
            categoria: req.body.categoria, 
            descripcion: req.body.descripcion,
            registro: req.body.fecha, 
            estado: req.body.estado,       
        }

        // codigo para guardar en database
    });


    // código para reenviar 

    res.redirect('/formulario-exito', { 
        header: "Emprendimiento creado con éxito",
        message: "Tu emprendimiento ha sido registrado correctamente y está en proceso de aprobación.",
        message_secundario: "El emprendimiento será visible en la pestaña de emprendimientos una vez sea aprobado."

    });
}