document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("crear-reporte");

    boton.addEventListener("click", function (e) {
        e.preventDefault();

        const campos = [
            {id: "titulo", tipo: "textarea"},
            {id: "descripcion", tipo: "textarea"},
        ];

        let formularioValido = true;

        campos.forEach((campo) => {
            const elemento = document.getElementById(campo.id);
            const valor = elemento.value.trim();

            const invalido = valor === "";

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
            alert("✅ Reporte creado con éxito.");
        }
    });
});
