document.addEventListener("DOMContentLoaded", function () {
  const filtroCategoria = document.getElementById("filtroCategoria");
  const busqueda = document.getElementById("busqueda");

  // Event listeners para filtros
  if (filtroCategoria) {
    filtroCategoria.addEventListener("change", filtrarEventos);
  }

  if (busqueda) {
    busqueda.addEventListener("input", filtrarEventos);
  }

  function filtrarEventos() {
    const categoriaSeleccionada = filtroCategoria ? filtroCategoria.value : "";
    const textoBusqueda = busqueda ? busqueda.value.toLowerCase() : "";
    const eventosCards = document.querySelectorAll(".evento-card");

    eventosCards.forEach((card) => {
      const categoria = card.dataset.categoria || "";
      const titulo = card.querySelector("h3")
        ? card.querySelector("h3").textContent.toLowerCase()
        : "";
      const ubicacion = card.querySelector(".evento-ubicacion")
        ? card.querySelector(".evento-ubicacion").textContent.toLowerCase()
        : "";
      const organizador = card.querySelector(".evento-organizador")
        ? card.querySelector(".evento-organizador").textContent.toLowerCase()
        : "";

      const coincideCategoria =
        !categoriaSeleccionada || categoria === categoriaSeleccionada;
      const coincideBusqueda =
        !textoBusqueda ||
        titulo.includes(textoBusqueda) ||
        ubicacion.includes(textoBusqueda) ||
        organizador.includes(textoBusqueda);

      if (coincideCategoria && coincideBusqueda) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Mostrar mensaje si no hay resultados
    const eventosVisibles = document.querySelectorAll(
      '.evento-card[style="display: block"], .evento-card:not([style*="display: none"])'
    );
    const noResults = document.getElementById("noResults");

    if (noResults) {
      if (eventosVisibles.length === 0) {
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }
    }
  }

  // Función para confirmar eliminación
  window.confirmarEliminacion = function (eventoTitulo) {
    return confirm(
      `¿Está seguro de que desea eliminar el evento "${eventoTitulo}"?`
    );
  };
});
