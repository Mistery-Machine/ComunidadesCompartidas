document.addEventListener("DOMContentLoaded", function () {
  const botonCrear = document.querySelector(".evento-boton-enviar");

  botonCrear.addEventListener("click", function (e) {
    e.preventDefault();

    // Selecciona los campos
    const titulo = document.querySelector(".evento-area-texto");
    const categoria = document.querySelector(".evento-select-formulario");
    const ubicacion = document.querySelectorAll(".evento-campo-formulario")[1];
    const organizador = document.querySelectorAll(
      ".evento-campo-formulario"
    )[2];

    let valido = true;

    // Validación de título
    if (titulo.value.trim() === "") {
      titulo.style.border = "2px solid red";
      valido = false;
    } else {
      titulo.style.border = "";
    }

    // Validación de categoría
    if (categoria.selectedIndex === 0) {
      categoria.style.border = "2px solid red";
      valido = false;
    } else {
      categoria.style.border = "";
    }

    // Validación de ubicación
    if (ubicacion.value.trim() === "") {
      ubicacion.style.border = "2px solid red";
      valido = false;
    } else {
      ubicacion.style.border = "";
    }

    // Validación de organizador
    if (organizador.value.trim() === "") {
      organizador.style.border = "2px solid red";
      valido = false;
    } else {
      organizador.style.border = "";
    }

    if (!valido) {
      alert("⚠️ Por favor completa todos los campos correctamente.");
    } else {
      alert("✅ Evento creado con éxito.");
      // Aquí podrías enviar los datos al servidor si fuera necesario
    }
  });
});
