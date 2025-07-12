// Obtener elementos del DOM
const inputs = document.querySelectorAll("#formularioRuta input");
const selectArea = document.querySelectorAll("#formularioRuta select");
const formulario = document.getElementById("formularioRuta");
const boton = document.querySelector("#boton-submit");

// Expresiones regulares para validación de rutas
const expresiones = {
    numeroRuta: /^[a-zA-Z0-9]{1,10}$/,
    recorrido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\→\-\,\.]{10,100}$/,
    horarioLunVie:
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    horarioSabado:
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    horarioDomingo:
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    frecuencia: /^(?!Frecuencia$).+$/,
    estado: /^(?!Estado$).+$/,
};

// Estado de los campos
const campos = {
    numeroRuta: false,
    recorrido: false,
    horarioLunVie: false,
    horarioSabado: false,
    horarioDomingo: false,
    frecuencia: false,
    estado: false,
};

// Función principal de validación
const validarFormulario = (e) => {
    const nombreCampo = e.target.name;
    switch (nombreCampo) {
        case "numeroRuta":
        case "recorrido":
        case "horarioLunVie":
        case "horarioSabado":
        case "horarioDomingo":
        case "frecuencia":
        case "estado":
            validarCampo(expresiones[nombreCampo], e.target, nombreCampo);
            break;
    }
};

// Función para validar campo individual
const validarCampo = (expresion, input, campo) => {
    const grupo = document.querySelector(`#grupo-${campo}`);
    const mensajeError = grupo.querySelector(".formulario-input-error");
    const selectArea = grupo.querySelector(".seleccion-formulario");

    if (expresion.test(input.value)) {
        // Validación correcta
        input.classList.remove("campo-incorrecto");
        input.classList.add("campo-correcto");
        mensajeError.classList.remove("input-error-activo");

        if (selectArea) {
            selectArea.classList.remove("campo-incorrecto");
            selectArea.classList.add("campo-correcto");
        }

        campos[campo] = true;
    } else {
        // Validación incorrecta
        input.classList.add("campo-incorrecto");
        input.classList.remove("campo-correcto");
        mensajeError.classList.add("input-error-activo");

        if (selectArea) {
            selectArea.classList.add("campo-incorrecto");
            selectArea.classList.remove("campo-correcto");
        }

        campos[campo] = false;
    }
    verificarCampos();
};

// Función para verificar si todos los campos están válidos
const verificarCampos = () => {
    if (
        campos.numeroRuta &&
        campos.recorrido &&
        campos.horarioLunVie &&
        campos.horarioSabado &&
        campos.horarioDomingo &&
        campos.frecuencia &&
        campos.estado
    ) {
        boton.disabled = false;
        boton.classList.remove("boton-deshabilitado");
    } else {
        boton.disabled = true;
        boton.classList.add("boton-deshabilitado");
    }
};

// Llamar la función ayuda a que el botón salga como deshabilitado al cargar la página
verificarCampos();

// Event listeners para inputs
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

// Event listeners para selects
selectArea.forEach((selectArea) => {
    selectArea.addEventListener("change", validarFormulario);
    selectArea.addEventListener("blur", validarFormulario);
});

// Función para manejar el envío del formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Verificar que todos los campos estén válidos
    if (Object.values(campos).every((campo) => campo === true)) {
        // Obtener los datos del formulario
        const datosRuta = {
            numeroRuta: document.getElementById("numero-ruta").value,
            recorrido: document.getElementById("recorrido").value,
            horarios: {
                lunVie: document.getElementById("horario-lun-vie").value,
                sabado: document.getElementById("horario-sabado").value,
                domingo: document.getElementById("horario-domingo").value,
            },
            frecuencia: document.getElementById("frecuencia").value,
            estado: document.getElementById("estado").value,
        };

        console.log("Datos de la ruta:", datosRuta);

        alert("Ruta registrada exitosamente!");
    } else {
        alert("Por favor completa todos los campos correctamente.");
    }
});
