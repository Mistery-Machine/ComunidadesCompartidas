// Obtener elementos del DOM
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const boton = document.getElementById("crear-reporte");

// Expresiones regulares
const expresiones = {
    titulo: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,!?]{6,100}$/,
    descripcion: /^[\s\S]{20,500}$/,
};

// Estado de los campos
const campos = {
    titulo: false,
    descripcion: false,
};

// Función de validación individual
const validarCampo = (input, campo) => {
    const grupo = input.closest(".formulario-grupo");
    const mensajeError = grupo.querySelector(".formulario-input-error");

    if (expresiones[campo].test(input.value.trim())) {
        input.classList.remove("campo-incorrecto");
        input.classList.add("campo-correcto");

        if (mensajeError) mensajeError.classList.remove("input-error-activo");

        campos[campo] = true;
    } else {
        input.classList.add("campo-incorrecto");
        input.classList.remove("campo-correcto");

        if (mensajeError) mensajeError.classList.add("input-error-activo");

        campos[campo] = false;
    }

    verificarCampos();
};

// Activar/desactivar botón según estado de validación
const verificarCampos = () => {
    if (campos.titulo && campos.descripcion) {
        boton.disabled = false;
        boton.classList.remove("boton-deshabilitado");
    } else {
        boton.disabled = true;
        boton.classList.add("boton-deshabilitado");
    }
};

// Eventos
titulo.addEventListener("keyup", () => validarCampo(titulo, "titulo"));
titulo.addEventListener("blur", () => validarCampo(titulo, "titulo"));

descripcion.addEventListener("keyup", () =>
    validarCampo(descripcion, "descripcion")
);
descripcion.addEventListener("blur", () =>
    validarCampo(descripcion, "descripcion")
);

// Estado inicial
verificarCampos();
