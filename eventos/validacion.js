const titulo = document.getElementById("titulo");
const ubicacion = document.getElementById("ubicacion");
const organizador = document.getElementById("organizador");
const categoria = document.getElementById("categoria");
const boton = document.getElementById("crear-evento");
const errorTitulo = document.getElementById("error-titulo");
const errorUbicacion = document.getElementById("error-ubicacion");
const errorOrganizador = document.getElementById("error-organizador");

const expresiones = {
  titulo: /^.{6,60}$/,
  ubicacion: /^.{6,100}$/,
  organizador: /^.{6,50}$/,
};

const campos = {
  titulo: false,
  ubicacion: false,
  organizador: false,
  categoria: false,
};

function validarCampo(input, campo, errorElemento, mensajeError) {
  if (expresiones[campo].test(input.value.trim())) {
    input.classList.remove("campo-incorrecto");
    input.classList.add("campo-correcto");
    errorElemento.textContent = "";
    campos[campo] = true;
  } else {
    input.classList.add("campo-incorrecto");
    input.classList.remove("campo-correcto");
    errorElemento.textContent = mensajeError;
    campos[campo] = false;
  }

  verificarFormulario();
}

function verificarFormulario() {
  if (
    campos.titulo &&
    campos.ubicacion &&
    campos.organizador &&
    categoria.value !== "Seleccione una categoría"
  ) {
    campos.categoria = true;
    boton.disabled = false;
    boton.classList.remove("boton-deshabilitado");
  } else {
    campos.categoria = false;
    boton.disabled = true;
    boton.classList.add("boton-deshabilitado");
  }
}

titulo.addEventListener("input", () =>
  validarCampo(
    titulo,
    "titulo",
    errorTitulo,
    "El título debe tener entre 6 y 60 caracteres."
  )
);

ubicacion.addEventListener("input", () =>
  validarCampo(
    ubicacion,
    "ubicacion",
    errorUbicacion,
    "La ubicación debe tener entre 6 y 100 caracteres."
  )
);

organizador.addEventListener("input", () =>
  validarCampo(
    organizador,
    "organizador",
    errorOrganizador,
    "El nombre del organizador debe tener entre 6 y 50 caracteres."
  )
);

categoria.addEventListener("change", verificarFormulario);

// Validación inicial
verificarFormulario();
