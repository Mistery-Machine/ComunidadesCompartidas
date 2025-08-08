const servicioCategorias = require("../services/servicioCategorias");

const formularioAnuncio = (app) => {
    app.get("/formulario-anuncio", async (req, res) => {
        try {
            const categorias = await servicioCategorias.obtenerCategoriaAnuncios();
            res.render("formulario-anuncio", {categorias: categorias.data});
        } catch (error) {
            res.render("formulario-anuncio", {categorias: []});
        }
    })
}

module.exports = {formularioAnuncio}
