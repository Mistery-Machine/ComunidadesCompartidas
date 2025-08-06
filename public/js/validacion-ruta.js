const formulario = document.getElementById("formularioRuta");
const inputs = document.querySelectorAll("#formularioRuta input");
const selects = document.querySelectorAll("#formularioRuta select");

const expresiones = {
  numeroRuta: /^.{1,10}$/,
  recorrido: /^.{3,100}$/,
  horario: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
};

const campos = {
  numeroRuta: false,
  recorrido: false,
  horarioLunVie: false,
  horarioSabado: false,
  horarioDomingo: false,
  frecuencia: false,
  estado: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "numeroRuta":
      validarCampo(expresiones.numeroRuta, e.target, "numeroRuta");
      break;
    case "recorrido":
      validarCampo(expresiones.recorrido, e.target, "recorrido");
      break;
    case "horarioLunVie":
      validarCampo(expresiones.horario, e.target, "horarioLunVie");
      break;
    case "horarioSabado":
      validarCampo(expresiones.horario, e.target, "horarioSabado");
      break;
    case "horarioDomingo":
      validarCampo(expresiones.horario, e.target, "horarioDomingo");
      break;
    case "frecuencia":
      validarSelect(e.target, "frecuencia");
      break;
    case "estado":
      validarSelect(e.target, "estado");
      break;
  }
  habilitarBoton(); // Llamar habilitarBoton después de cada validación
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-correcto");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-correcto");
    campos[campo] = false;
  }
};

const validarSelect = (select, campo) => {
  if (select.value !== "" && select.selectedIndex > 0) {
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-correcto");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-correcto");
    campos[campo] = false;
  }
};

const habilitarBoton = () => {
  const boton = document.getElementById("boton-submit");

  if (
    campos.numeroRuta &&
    campos.recorrido &&
    campos.horarioLunVie &&
    campos.horarioSabado &&
    campos.horarioDomingo &&
    campos.frecuencia &&
    campos.estado
  ) {
    boton.classList.remove("boton-deshabilitado");
    boton.disabled = false;
  } else {
    boton.classList.add("boton-deshabilitado");
    boton.disabled = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
  input.addEventListener("input", validarFormulario);
});

selects.forEach((select) => {
  select.addEventListener("change", validarFormulario);
});

// Validar campos pre-llenados en modo edición
document.addEventListener("DOMContentLoaded", () => {
  inputs.forEach((input) => {
    if (input.value) {
      const event = { target: input };
      validarFormulario(event);
    }
  });

  selects.forEach((select) => {
    if (select.value && !select.options[select.selectedIndex].disabled) {
      const event = { target: select };
      validarFormulario(event);
    }
  });

  habilitarBoton();
});

formulario.addEventListener("submit", (e) => {
  if (
    !campos.numeroRuta ||
    !campos.recorrido ||
    !campos.horarioLunVie ||
    !campos.horarioSabado ||
    !campos.horarioDomingo ||
    !campos.frecuencia ||
    !campos.estado
  ) {
    e.preventDefault();
    alert("Por favor, completa todos los campos correctamente.");
  }
});
