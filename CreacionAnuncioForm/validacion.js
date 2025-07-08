document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("crear-anuncio");

  boton.addEventListener("click", function (e) {
    e.preventDefault();

    const campos = [
      { id: "nombre-negocio", tipo: "input" },
      { id: "telefono", tipo: "input" },
      { id: "ubicacion", tipo: "input" },
      { id: "categoria", tipo: "select" },
      { id: "descripcion", tipo: "textarea" },
      { id: "estado", tipo: "select" },
    ];

    let formularioValido = true;

    campos.forEach((campo) => {
      const elemento = document.getElementById(campo.id);
      const valor = elemento.value.trim();

      let invalido = false;

      if (campo.tipo === "select") {
        invalido = elemento.selectedIndex === 0;
      } else {
        invalido = valor === "";
      }

      if (invalido) {
        elemento.style.border = "2px solid red";
        formularioValido = false;
      } else {
        elemento.style.border = "";
      }
    });

    if (!formularioValido) {
      alert("Por favor completa todos los campos obligatorios.");
    } else {
      alert("Formulario válido. Aquí podrías enviarlo al servidor.");
    }
  });
});
