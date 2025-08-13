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

// Función para enviar el formulario
const enviarReporte = async () => {
  if (!campos.titulo || !campos.descripcion) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const datosReporte = {
    tipo: titulo.value.trim(),
    descripcion: descripcion.value.trim(),
    Autor: window.usuarioActual
      ? window.usuarioActual.nombre
      : "Usuario Anónimo",
    estado: "Pendiente",
  };

  try {
    boton.disabled = true;
    boton.textContent = "Enviando...";

    // Crear un formulario temporal para enviar los datos
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/reportes";
    form.style.display = "none";

    // Agregar campos al formulario
    Object.keys(datosReporte).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = datosReporte[key];
      form.appendChild(input);
    });

    // Agregar el formulario al DOM y enviarlo
    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error("Error:", error);
    alert("Error al enviar el reporte. Inténtalo de nuevo.");
    boton.disabled = false;
    boton.textContent = "Crear Reporte";
    verificarCampos();
  }
};

// Evento del botón
boton.addEventListener("click", enviarReporte);

// Estado inicial
verificarCampos();
