// Elementos del DOM
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const boton = document.getElementById("crear-anuncio");

// Expresiones regulares
const expresiones = {
    titulo: /^.{3,100}$/,
    descripcion: /^.{10,500}$/,
};

// Estado de los campos
const campos = {
    titulo: false,
    descripcion: false,
};

// Validación individual
function validarCampo(input, campo, mensaje) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("mensaje-error")) {
        error = document.createElement("p");
        error.className = "mensaje-error";
        error.style.color = "red";
        error.style.fontSize = "0.8rem";
        error.style.marginTop = "0.5rem";
        input.parentNode.appendChild(error);
    }

    if (expresiones[campo].test(input.value.trim())) {
        input.classList.remove("campo-incorrecto");
        input.classList.add("campo-correcto");
        error.textContent = "";
        campos[campo] = true;
    } else {
        input.classList.add("campo-incorrecto");
        input.classList.remove("campo-correcto");
        error.textContent = mensaje;
        campos[campo] = false;
    }

    verificarCampos();
}

// Verificar si se puede activar el botón
function verificarCampos() {
    const todosValidos = Object.values(campos).every((estado) => estado === true);

    if (todosValidos) {
        boton.disabled = false;
        boton.classList.remove("boton-deshabilitado");
    } else {
        boton.disabled = true;
        boton.classList.add("boton-deshabilitado");
    }
}

// Eventos
titulo.addEventListener("keyup", () =>
    validarCampo(
        titulo,
        "titulo",
        "El título debe tener entre 3 y 100 caracteres."
    )
);

descripcion.addEventListener("keyup", () =>
    validarCampo(
        descripcion,
        "descripcion",
        "La descripción debe tener entre 10 y 500 caracteres."
    )
);

// Estado inicial
boton.disabled = true;
boton.classList.add("boton-deshabilitado");
