const servicioEmprendimiento = require('../services/servicioEmprendimiento');

const emprendimientoLista = (app) => {
    app.get('/emprendimientos', async (req, res) => {
        const emprendimientos = await servicioEmprendimiento.obtenerTodos();     
        if (emprendimientos.exito) {
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

module.exports = emprendimientoLista; 