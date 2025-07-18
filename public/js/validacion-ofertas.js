// Obtener elementos del DOM
const inputs = document.querySelectorAll('#formularioOfertas input');
const textarea = document.querySelectorAll('#formularioOfertas textarea');
const selectArea = document.querySelectorAll('#formularioOfertas select')

const formulario = document.getElementById("formularioOfertas");
const boton = document.querySelector("#boton-submit");

// Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,50}$/,
    descripcion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\-]{10,100}$/,
    articulo: /^(?!Articulo$).+$/,
    fechaInicio: /^(?!DD\/MM\/YYYY$).+$/,
    fechaFin: /^(?!DD\/MM\/YYYY$).+$/

}

// Estado de los campos
const campos = {
    articulo: false,
    nombre: false,
    descripcion: false,
    fechaInicio: false,
    fechaFin: false
}

// Función principal de validación
const validarFormulario = (e) => {
    const nombreCampo = e.target.name;

    switch (nombreCampo) {
        case "nombre":
        case "descripcion":
        case "fechaInicio":
        case "fechaFin":
        case "articulo":
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
            selectArea.classList.remove("campo-incorrecto");
            selectArea.classList.add('campo-correcto');
        }

        campos[campo] = false;
    }

    verificarCampos();
}

const verificarCampos = () => {
    if (campos.nombre && campos.articulo && campos.descripcion && campos.fechaInicio && campos.fechaFin) {
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
    selectArea.addEventListener("keyup", validarFormulario);
    selectArea.addEventListener("blur", validarFormulario);
})
