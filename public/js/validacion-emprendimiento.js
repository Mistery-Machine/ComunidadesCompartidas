// Obtener elementos del DOM
const inputs = document.querySelectorAll('#formularioEmprendimiento input');
const textarea = document.querySelectorAll('#formularioEmprendimiento textarea');
const selectArea = document.querySelectorAll('#formularioEmprendimiento select')

const formulario = document.getElementById("formularioEmprendimiento");
const boton = document.querySelector("#boton-submit");

// Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,50}$/,
    telefono: /^\d{4}-\d{4}$/,
    ubicacion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\-]{10,100}$/,
    descripcion: /^[\s\S]{20,500}$/,
    categoria: /^(?!Categoría$).+$/
}

// Estado de los campos
const campos = {
    nombre: false,
    telefono: false,
    ubicacion: false,
    descripcion: false,
    categoria: false
}

// Función principal de validación
const validarFormulario = (e) => {
    const nombreCampo = e.target.name;

    switch (nombreCampo) {
        case "nombre":
        case "telefono":
        case "ubicacion":
        case "descripcion":
        case "categoria":
            validarCampo(expresiones[nombreCampo], e.target, nombreCampo);
            break;
    }
}

// Función para validar campo individual
const validarCampo = (expresion, input, campo) => {
    const grupo = document.querySelector(`#grupo-${campo}`);
    const mensajeError = grupo.querySelector('.formulario-input-error');
    const textArea = grupo.querySelector('.area-texto');
    const selectArea = grupo.querySelector('.seleccion-formulario');

    if (expresion.test(input.value)) {
        // Validación correcta
        input.classList.remove("campo-incorrecto");
        input.classList.add("campo-correcto");
        mensajeError.classList.remove("input-error-activo");

        // Solo aplica a textareas si existen
        if (textArea) {
            textArea.classList.remove("campo-incorrecto");
            textArea.classList.add("campo-correcto");
        }

        if (selectArea) {
            selectArea.classList.remove('campo-incorrecto');
            selectArea.classList.add('campo-correcto')
        }

        campos[campo] = true;
    } else {
        // Validación incorrecta
        input.classList.add("campo-incorrecto");
        input.classList.remove("campo-correcto");
        mensajeError.classList.add("input-error-activo");

        // Solo aplica a textareas si existen
        if (textArea) {
            textArea.classList.add("campo-incorrecto");
            textArea.classList.remove("campo-correcto");
        }

        if (selectArea) {
            selectArea.classList.add("campo-incorrecto");
            selectArea.classList.remove('campo-correcto');
        }

        campos[campo] = false;
    }

    verificarCampos();
}

const verificarCampos = () => {
    if (campos.nombre && campos.categoria && campos.descripcion && campos.telefono && campos.ubicacion) {
        boton.disabled = false;
        boton.classList.remove('boton-deshabilitado')
    } else {
        boton.disabled = true;
        boton.classList.add('boton-deshabilitado')
    }
}

// Llamar la funcion ayuda a que el boton salga como deshabilitado al cargar la pagina.
verificarCampos();

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

textarea.forEach((textarea) => {
    textarea.addEventListener("keyup", validarFormulario);
    textarea.addEventListener("blur", validarFormulario);
})

selectArea.forEach((selectArea) => {
    selectArea.addEventListener("change", validarFormulario);
    selectArea.addEventListener("blur", validarFormulario);
})
