document.addEventListener("DOMContentLoaded", function () {
  const botonCrear = document.getElementById("boton-crear-oferta");

  botonCrear.addEventListener("click", function (e) {
    e.preventDefault();

    const campos = [
      { id: "articulo", tipo: "select" },
      { id: "nombre-oferta", tipo: "input" },
      { id: "descripcion", tipo: "textarea" },
      { id: "input-detalle-imagen", tipo: "imagen" },
    ];

    let formularioValido = true;

    campos.forEach((campo) => {
      const elemento = document.getElementById(campo.id);
      const valor = elemento.value.trim();

      let invalido = false;

      if (campo.tipo === "select") {
        invalido = elemento.selectedIndex === 0;
      } else if (campo.tipo === "imagen") {
        invalido = valor === "" || valor === "fotoPromocion.png";
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
      alert("Por favor completa todos los campos requeridos correctamente.");
    } else {
      alert("✅ Oferta registrada con éxito.");
      // Aquí podrías enviar los datos a un servidor si fuera necesario
    }
  });
});
