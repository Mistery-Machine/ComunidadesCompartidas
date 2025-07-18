// Elementos del DOM
const nombre = document.getElementById("nombre-negocio");
const telefono = document.getElementById("telefono");
const ubicacion = document.getElementById("ubicacion");
const categoria = document.getElementById("categoria");
const descripcion = document.getElementById("descripcion");
const estado = document.getElementById("estado");
const boton = document.getElementById("crear-anuncio");

// Expresiones regulares
const expresiones = {
  nombre: /^.{6,32}$/,
  telefono: /^\d{8}$/, // ejemplo para 8 dígitos sin guiones
  ubicacion: /^.{6,100}$/,
  descripcion: /^.{20,500}$/,
};

// Estado de los campos
const campos = {
  nombre: false,
  telefono: false,
  ubicacion: false,
  categoria: false,
  descripcion: false,
  estado: false,
};

// Validación individual
function validarCampo(input, campo, mensaje) {
  let error = input.nextElementSibling;

  if (!error || !error.classList.contains("mensaje-error")) {
    error = document.createElement("p");
    error.className = "mensaje-error";
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

function validarSelect(select, campo, mensaje) {
  let error = select.nextElementSibling;

  if (!error || !error.classList.contains("mensaje-error")) {
    error = document.createElement("p");
    error.className = "mensaje-error";
    select.parentNode.appendChild(error);
  }

  if (select.value !== "" && !select.options[select.selectedIndex].disabled) {
    select.classList.remove("campo-incorrecto");
    select.classList.add("campo-correcto");
    error.textContent = "";
    campos[campo] = true;
  } else {
    select.classList.add("campo-incorrecto");
    select.classList.remove("campo-correcto");
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
nombre.addEventListener("keyup", () =>
  validarCampo(
    nombre,
    "nombre",
    "El nombre del negocio debe tener entre 6 y 32 caracteres."
  )
);
telefono.addEventListener("keyup", () =>
  validarCampo(telefono, "telefono", "Debe contener exactamente 8 dígitos.")
);
ubicacion.addEventListener("keyup", () =>
  validarCampo(
    ubicacion,
    "ubicacion",
    "Debe contener entre 6 y 100 caracteres."
  )
);
descripcion.addEventListener("keyup", () =>
  validarCampo(
    descripcion,
    "descripcion",
    "La descripción debe tener entre 20 y 500 caracteres."
  )
);

categoria.addEventListener("change", () =>
  validarSelect(categoria, "categoria", "Seleccione una categoría válida.")
);
estado.addEventListener("change", () =>
  validarSelect(estado, "estado", "Seleccione un estado válido.")
);

// Estado inicial
boton.disabled = true;
boton.classList.add("boton-deshabilitado");
