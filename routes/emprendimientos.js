const servicioEmprendimiento = require('../services/servicioEmprendimiento');

const emprendimientoLista = (app) => {
    app.get('/emprendimientos', async (req, res) => {
        const emprendimientos = await servicioEmprendimiento.obtenerTodos();     
        if (emprendimientos.exito) {
            console.log(emprendimientos.data);
            res.render('emprendimientos', { emprendimientos: emprendimientos.data });
        } else {
            res.render('formulario-error', {
                headline: "Ha ocurrido un error",
                message: emprendimientos.data,
                message_secundario: "Por favor verifica la consola para determinar que ocurre"
            });
        }
    });
}

const emprendimientoId = (app) => {
    app.get('/emprendimiento-ver/:id', async (req, res) => {
        const id = req.params.id;
        const emprendimiento = await servicioEmprendimiento.obtenerPorId(id);

        if (emprendimiento.exito) {
            res.render('emprendimiento-ver', { emprendimientos: emprendimiento.data });
        } else {
            res.render('formulario-error', {
                headline: "Ha ocurrido un error",
                message: emprendimiento.data,
                message_secundario: "Por favor verifica la consola para determinar que ocurre"
            });
        }
    });
}

module.exports = {emprendimientoLista, emprendimientoId}; 