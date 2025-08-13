const servicioEmprendimiento = require('../services/servicioEmprendimiento');
const servicioCategorias = require('../services/servicioCategorias');

const emprendimientoLista = (app) => {
    app.get('/emprendimientos', async (req, res) => {
        const emprendimientos = await servicioEmprendimiento.obtenerTodos();
        const categorias = await servicioCategorias.obtenerCategoriaEmprendimientos();
        if (emprendimientos.exito && categorias.exito) {
            res.render('emprendimientos', {emprendimientos: emprendimientos.data, categorias: categorias.data});
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
            res.render('emprendimiento-ver', {emprendimientos: emprendimiento.data});
        } else {
            res.render('formulario-error', {
                headline: "Ha ocurrido un error",
                message: emprendimiento.data,
                message_secundario: "Por favor verifica la consola para determinar que ocurre"
            });
        }
    });

    app.get('/editar-emprendimiento/:id', async (req, res) => {
        const id = req.params.id;
        const emprendimiento = await servicioEmprendimiento.obtenerPorId(id);
        const categorias = await servicioCategorias.obtenerCategoriaEmprendimientos();
        if (emprendimiento.exito && categorias.exito) {
            res.render('formulario-emprendimiento', {
                emprendimientos: emprendimiento.data,
                categorias: categorias.data
            });
        } else {
            res.render('formulario-error', {
                headline: "Ha ocurrido un error",
                message: emprendimiento.data,
                message_secundario: "Por favor verifica la consola para determinar que ocurre"
            });
        }
    });

    app.post('/editar-emprendimiento/:id', async (req, res) => {
        const id = req.params.id;
        const datosActualizados = req.body;
        const emprendimientoActualizado = await servicioEmprendimiento.actualizarPorId(id, datosActualizados);
        if (emprendimientoActualizado.exito) {
            res.render('formulario-exito', {
                headline: "Emprendimiento actualizado",
                message: "El emprendimiento ha sido actualizado con éxito",
                message_secundario: "Puedes verlo en la lista de emprendimientos"
            });
        } else {
            res.render('formulario-error', {
                headline: "Ha ocurrido un error",
                message: emprendimientoActualizado.data,
                message_secundario: "Por favor verifica la consola para determinar que ocurre"
            });
        }
    });

    app.post('/eliminar-emprendimiento/:id', async (req, res) => {
        const id = req.params.id;
        const emprendimientoEliminado = await servicioEmprendimiento.eliminarPorId(id);
        if (emprendimientoEliminado.exito) {
            res.render('formulario-exito', {
                headline: "Emprendimiento eliminado",
                message: "El emprendimiento ha sido eliminado con éxito",
                message_secundario: "Puedes verlo en la lista de emprendimientos"
            });
        } else {
            res.render('formulario-error', {
                headline: "Ha ocurrido un error",
                message: emprendimientoEliminado.data,
                message_secundario: "Por favor verifica la consola para determinar que ocurre"
            });
        }
    });
}

module.exports = {emprendimientoLista, emprendimientoId};