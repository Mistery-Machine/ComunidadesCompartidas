let eventos = Array.from(document.querySelectorAll('.tarjeta-evento'));
let eventosFiltrados = [...eventos];
let paginaActual = 1;
let itemsPorPagina = 9;

// Filtros por categoría
document.querySelectorAll('.filtro-categoria').forEach(btn => {
    btn.addEventListener('click', function() {
        // Actualizar botón activo
        document.querySelectorAll('.filtro-categoria').forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        
        // Filtrar eventos
        const categoria = this.dataset.categoria;
        if (categoria === 'todos') {
            eventosFiltrados = [...eventos];
        } else {
            eventosFiltrados = eventos.filter(evento => 
                evento.dataset.categoria === categoria
            );
        }
        
        paginaActual = 1;
        mostrarPagina();
    });
});

// Items por página
document.getElementById('itemsPorPagina').addEventListener('change', function() {
    itemsPorPagina = parseInt(this.value);
    paginaActual = 1;
    mostrarPagina();
});

// Botones de paginación
document.getElementById('btnAnterior').addEventListener('click', function() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina();
    }
});

document.getElementById('btnSiguiente').addEventListener('click', function() {
    const totalPaginas = Math.ceil(eventosFiltrados.length / itemsPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarPagina();
    }
});

function mostrarPagina() {
    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const totalPaginas = Math.ceil(eventosFiltrados.length / itemsPorPagina);
    
    // Ocultar todos los eventos
    eventos.forEach(evento => evento.style.display = 'none');
    
    // Mostrar solo los de la página actual
    eventosFiltrados.slice(inicio, fin).forEach(evento => {
        evento.style.display = 'block';
    });
    
    // Mostrar/ocultar mensaje de "no results"
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = eventosFiltrados.length === 0 ? 'block' : 'none';
    }
    
    // Actualizar información del paginador
    document.getElementById('inicioRango').textContent = eventosFiltrados.length > 0 ? inicio + 1 : 0;
    document.getElementById('finRango').textContent = Math.min(fin, eventosFiltrados.length);
    document.getElementById('totalItems').textContent = eventosFiltrados.length;
    
    // Actualizar botones
    document.getElementById('btnAnterior').disabled = paginaActual === 1;
    document.getElementById('btnSiguiente').disabled = paginaActual >= totalPaginas;
    
    // Generar números de página
    generarNumerosPagina(totalPaginas);
}

function generarNumerosPagina(totalPaginas) {
    const contenedor = document.getElementById('numerosPagina');
    contenedor.innerHTML = '';
    
    // Mostrar máximo 5 números de página
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, inicio + 4);
    
    if (fin - inicio < 4) {
        inicio = Math.max(1, fin - 4);
    }
    
    for (let i = inicio; i <= fin; i++) {
        const btn = document.createElement('button');
        btn.className = `btn-paginador ${i === paginaActual ? 'activo' : ''}`;
        btn.textContent = i;
        btn.addEventListener('click', function() {
            paginaActual = i;
            mostrarPagina();
        });
        contenedor.appendChild(btn);
    }
}

// Inicializar
mostrarPagina();