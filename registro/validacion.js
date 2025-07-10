document.addEventListener("DOMContentLoaded", function () {
  const boton = document.querySelector('input[type="submit"]');

  boton.addEventListener("click", function (e) {
    e.preventDefault();

    const campos = [
      { id: "nombre", tipo: "input" },
      { id: "correo", tipo: "input" },
      { id: "contrasena", tipo: "input" },
      { id: "rol", tipo: "select" },
      { id: "fechaNacimiento", tipo: "input" },
      { id: "telefono", tipo: "input" },
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
      alert("✅ Registro válido. Aquí podrías enviarlo al servidor.");
    }
  });
});
