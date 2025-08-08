document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.getElementById("titulo");
    const categoria = document.getElementById("categoria");
    const fechaEvento = document.getElementById("fechaEvento");
    const ubicacion = document.getElementById("ubicacion");
    const organizador = document.getElementById("organizador");
    const telefono = document.getElementById("telefono");
    const botonCrear = document.getElementById("crear-evento");
    const formulario = document.querySelector("form");

    // Elementos de error
    const errorTitulo = document.getElementById("error-titulo");
    const errorFechaEvento = document.getElementById("error-fechaEvento");
    const errorUbicacion = document.getElementById("error-ubicacion");
    const errorOrganizador = document.getElementById("error-organizador");
    const errorTelefono = document.getElementById("error-telefono");

    // Establecer fecha mínima como hoy
    const hoy = new Date().toISOString().split("T")[0];
    fechaEvento.min = hoy;

    // Función para validar campos
    function validarCampo(campo, mensajeError, elemento) {
        if (campo.value.trim() === "") {
            elemento.textContent = mensajeError;
            elemento.style.display = "block";
            return false;
        } else {
            elemento.textContent = "";
            elemento.style.display = "none";
            return true;
        }
    }

    // Función para validar fecha
    function validarFecha() {
        if (fechaEvento.value === "") {
            errorFechaEvento.textContent = "La fecha del evento es obligatoria";
            errorFechaEvento.style.display = "block";
            return false;
        } else if (fechaEvento.value < hoy) {
            errorFechaEvento.textContent =
                "La fecha del evento no puede ser anterior a hoy";
            errorFechaEvento.style.display = "block";
            return false;
        } else {
            errorFechaEvento.textContent = "";
            errorFechaEvento.style.display = "none";
            return true;
        }
    }

    // Función para validar teléfono
    function validarTelefono() {
        const telefonoRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
        if (telefono.value.trim() === "") {
            errorTelefono.textContent = "El teléfono es obligatorio";
            errorTelefono.style.display = "block";
            return false;
        } else if (!telefonoRegex.test(telefono.value.trim())) {
            errorTelefono.textContent = "Formato de teléfono inválido";
            errorTelefono.style.display = "block";
            return false;
        } else {
            errorTelefono.textContent = "";
            errorTelefono.style.display = "none";
            return true;
        }
    }

    // Función para validar formulario completo
    function validarFormulario() {
        const tituloValido = validarCampo(
            titulo,
            "El título es obligatorio",
            errorTitulo
        );
        const fechaValida = validarFecha();
        const ubicacionValida = validarCampo(
            ubicacion,
            "La ubicación es obligatoria",
            errorUbicacion
        );
        const organizadorValido = validarCampo(
            organizador,
            "El organizador es obligatorio",
            errorOrganizador
        );
        const telefonoValido = validarTelefono();
        const categoriaValida = categoria.value !== "Seleccione una categoría";

        const formularioValido =
            tituloValido &&
            fechaValida &&
            ubicacionValida &&
            organizadorValido &&
            telefonoValido &&
            categoriaValida;

        if (formularioValido) {
            botonCrear.disabled = false;
            botonCrear.classList.remove("boton-deshabilitado");
        } else {
            botonCrear.disabled = true;
            botonCrear.classList.add("boton-deshabilitado");
        }

        return formularioValido;
    }

    // Event listeners para validación en tiempo real
    titulo.addEventListener("input", validarFormulario);
    categoria.addEventListener("change", validarFormulario);
    fechaEvento.addEventListener("change", validarFormulario);
    ubicacion.addEventListener("input", validarFormulario);
    organizador.addEventListener("input", validarFormulario);
    telefono.addEventListener("input", validarFormulario);

    // Validación inicial
    validarFormulario();

    // Envío del formulario
    formulario.addEventListener("submit", function (e) {
        if (!validarFormulario()) {
            e.preventDefault();
            return false;
        }

        // Cambiar texto del botón mientras se procesa
        botonCrear.textContent = "Creando...";
        botonCrear.disabled = true;

        // Permitir que el formulario se envíe normalmente
        return true;
    });
});
