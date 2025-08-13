// Obtener elementos del DOM
const inputs = document.querySelectorAll('#formulario-eventos input');
const textarea = document.querySelectorAll('#formulario-eventos textarea');
const selectArea = document.querySelectorAll('#formulario-eventos select');
const formulario = document.querySelector("form");
const boton = document.querySelector("#crear-evento");

// Expresiones regulares
const expresiones = {
    titulo: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\.,\-]{10,100}$/,
    ubicacion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\-]{10,100}$/,
    organizador: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,50}$/,
    telefono: /^[\+]?[0-9\s\-\(\)]{8,15}$/,
    categoria: /^(?!Seleccione una categoría$).+$/,
    fechaEvento: /^\d{4}-\d{2}-\d{2}$/
};

// Estado de los campos
const campos = {
    titulo: false,
    categoria: false,
    fechaEvento: false,
    ubicacion: false,
    organizador: false,
    telefono: false
};

// Establecer fecha mínima como hoy
const fechaEvento = document.getElementById("fechaEvento");
const hoy = new Date().toISOString().split("T")[0];
fechaEvento.min = hoy;

// Función principal de validación
const validarFormulario = (e) => {
    const nombreCampo = e.target.name;
    switch (nombreCampo) {
        case "titulo":
        case "categoria":
        case "fechaEvento":
        case "ubicacion":
        case "organizador":
        case "telefono":
            if (nombreCampo === "fechaEvento") {
                validarFecha(e.target);
            } else {
                validarCampo(expresiones[nombreCampo], e.target, nombreCampo);
            }
            break;
    }
};

// Función para validar campo individual
const validarCampo = (expresion, input, campo) => {
    const mensajeError = document.querySelector(`#error-${campo}`);
    
    if (expresion.test(input.value)) {
        // Validación correcta
        input.classList.remove("campo-incorrecto");
        input.classList.add("campo-correcto");
        if (mensajeError) {
            mensajeError.classList.remove("input-error-activo");
        }
        campos[campo] = true;
    } else {
        // Validación incorrecta
        input.classList.add("campo-incorrecto");
        input.classList.remove("campo-correcto");
        if (mensajeError) {
            mensajeError.classList.add("input-error-activo");
        }
        campos[campo] = false;
    }
    verificarCampos();
};

// Función especial para validar fecha
const validarFecha = (input) => {
    const mensajeError = document.querySelector("#error-fechaEvento");
    const fechaSeleccionada = input.value;
    
    if (fechaSeleccionada === "") {
        input.classList.add("campo-incorrecto");
        input.classList.remove("campo-correcto");
        if (mensajeError) {
            mensajeError.textContent = "La fecha del evento es obligatoria";
            mensajeError.classList.add("input-error-activo");
        }
        campos.fechaEvento = false;
    } else if (fechaSeleccionada < hoy) {
        input.classList.add("campo-incorrecto");
        input.classList.remove("campo-correcto");
        if (mensajeError) {
            mensajeError.textContent = "La fecha del evento no puede ser anterior a hoy";
            mensajeError.classList.add("input-error-activo");
        }
        campos.fechaEvento = false;
    } else {
        input.classList.remove("campo-incorrecto");
        input.classList.add("campo-correcto");
        if (mensajeError) {
            mensajeError.classList.remove("input-error-activo");
        }
        campos.fechaEvento = true;
    }
    verificarCampos();
};

// Función para verificar todos los campos
const verificarCampos = () => {
    const todosValidos = Object.values(campos).every(campo => campo === true);
    
    if (todosValidos) {
        boton.disabled = false;
        boton.classList.remove('boton-deshabilitado');
    } else {
        boton.disabled = true;
        boton.classList.add('boton-deshabilitado');
    }
};

// Llamar la función para que el botón salga como deshabilitado al cargar la página
verificarCampos();

// Event listeners
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

textarea.forEach((textarea) => {
    textarea.addEventListener("keyup", validarFormulario);
    textarea.addEventListener("blur", validarFormulario);
});

selectArea.forEach((select) => {
    select.addEventListener("change", validarFormulario);
    select.addEventListener("blur", validarFormulario);
});

// Envío del formulario
formulario.addEventListener("submit", function (e) {
    if (!Object.values(campos).every(campo => campo === true)) {
        e.preventDefault();
        return false;
    }

    // Cambiar texto del botón mientras se procesa
    boton.textContent = "Creando...";
    boton.disabled = true;

    return true;
});