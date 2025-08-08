const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let eventosDelMes = [];

async function cargarEventosDelMes(mes, año) {
    try {
        const response = await fetch(`/api/eventos/mes/${mes + 1}/${año}`);
        const data = await response.json();
        if (data.exito) {
            eventosDelMes = data.data;
        } else {
            eventosDelMes = [];
        }
    } catch (error) {
        console.error("Error al cargar eventos:", error);
        eventosDelMes = [];
    }
}

function tieneEventoEnFecha(dia, mes, año) {
    const fechaBuscada = `${año}-${String(mes + 1).padStart(2, "0")}-${String(
        dia
    ).padStart(2, "0")}`;
    return eventosDelMes.some((evento) => evento.fechaEvento === fechaBuscada);
}

function mostrarEventosDelMes() {
    const eventsList = document.getElementById("eventsList");
    eventsList.innerHTML = "";

    if (eventosDelMes.length === 0) {
        eventsList.innerHTML =
            '<p class="no-events">No hay eventos programados para este mes</p>';
        return;
    }

    eventosDelMes.forEach((evento) => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");

        const fechaEvento = new Date(evento.fechaEvento + "T00:00:00");
        const dia = fechaEvento.getDate();
        const mesCorto = monthNames[fechaEvento.getMonth()].substring(0, 3);

        eventItem.innerHTML = `
            <div class="event-date">${dia} ${mesCorto}</div>
            <div class="event-info">
                <h4>${evento.titulo}</h4>
                <p><strong>Categoría:</strong> ${evento.categoria}</p>
                <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
                <p><strong>Organizador:</strong> ${evento.organizador}</p>
            </div>
        `;

        eventsList.appendChild(eventItem);
    });
}

async function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = document.getElementById("calendarDays");
    const currentMonthElement = document.getElementById("currentMonth");

    // Cargar eventos del mes
    await cargarEventosDelMes(month, year);

    calendarDays.innerHTML = "";
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("calendar-day", "empty");
        calendarDays.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");
        dayElement.textContent = day;

        let dayDate = new Date();
        if (
            year === dayDate.getFullYear() &&
            month === dayDate.getMonth() &&
            day === dayDate.getDate()
        ) {
            dayElement.classList.add("today");
        }

        // Verificar si hay eventos en esta fecha
        if (tieneEventoEnFecha(day, month, year)) {
            dayElement.classList.add("has-event");
        }

        calendarDays.appendChild(dayElement);
    }

    // Mostrar lista de eventos
    mostrarEventosDelMes();
}

document.getElementById("prevMonth").addEventListener("click", async () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    await generateCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", async () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    await generateCalendar(currentMonth, currentYear);
});

// Inicializar calendario
generateCalendar(currentMonth, currentYear);
