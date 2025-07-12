async function initMap() {
    const {Map} = await google.maps.importLibrary("maps");
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

    //San Rafael Arriba
    const center = {lat: 9.8750384, lng: -84.0772218};

    const map = new Map(document.getElementById("map"), {
        zoom: 20,
        center,
        mapId: "4504f8b37365c3d0",
    });

    for (const place of pointsOfInterest) {
        const marker = new AdvancedMarkerElement({
            map,
            content: buildContent(place),
            position: place.position,
            title: place.description,
        });

        marker.addListener("click", () => {
            toggleHighlight(marker, place);
        });
    }
}

function toggleHighlight(markerView) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
    } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 1;
    }
}

function buildContent(place) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
                <div class="icon">
                    <i aria-hidden="true" class="fas fa-${place.icon}" title="${
        place.type
    }"></i>
                    <span class="fa-sr-only">${place.type}</span>
                </div>
                <div class="details">
                    <div class="name">${place.name}</div>
                    <div class="address">${place.address}</div>
                    <div class="description">${place.description}</div>
                    <div class="features">
                        <div>
                            <i aria-hidden="true" class="fas fa-map-marker-alt" title="ubicación"></i>
                            <span>${place.zone}</span>
                        </div>
                        ${
        place.rating
            ? `
                        <div>
                            <i aria-hidden="true" class="fas fa-star" title="calificación"></i>
                            <span>${place.rating}</span>
                        </div>
                        `
            : ""
    }
                    </div>
                </div>
            `;
    return content;
}

const pointsOfInterest = [
    {
        name: "Iglesia Católica San Rafael",
        address: "Centro de San Rafael Arriba",
        description: "Iglesia principal de la comunidad",
        type: "Religioso",
        icon: "church",
        zone: "Centro",
        rating: "4.5★",
        position: {
            lat: 9.8750384,
            lng: -84.0772218,
        },
    },
    {
        name: "Escuela San Rafael Arriba",
        address: "400m norte de la iglesia",
        description: "Centro educativo primario de la zona",
        type: "Educación",
        icon: "graduation-cap",
        zone: "Norte",
        position: {
            lat: 9.8786234,
            lng: -84.0765432,
        },
    },
    {
        name: "Pulpería El Pueblo",
        address: "Frente al parque central",
        description: "Supermercado local con productos básicos",
        type: "Comercio",
        icon: "shopping-cart",
        zone: "Centro",
        rating: "4.2★",
        position: {
            lat: 9.8745123,
            lng: -84.0778456,
        },
    },
    {
        name: "Soda La Esquina",
        address: "Esquina sureste del parque",
        description: "Restaurante típico costarricense",
        type: "Gastronomía",
        icon: "utensils",
        zone: "Centro",
        rating: "4.7★",
        position: {
            lat: 9.8742567,
            lng: -84.0769876,
        },
    },
    {
        name: "EBAIS San Rafael",
        address: "200m sur de la iglesia",
        description: "Centro de salud básico integral",
        type: "Salud",
        icon: "heart",
        zone: "Sur",
        rating: "4.1★",
        position: {
            lat: 9.8720345,
            lng: -84.0775432,
        },
    },
    {
        name: "Parque Central",
        address: "Frente a la iglesia",
        description: "Área recreativa y de reunión comunitaria",
        type: "Recreación",
        icon: "tree",
        zone: "Centro",
        rating: "4.3★",
        position: {
            lat: 9.8748756,
            lng: -84.0774321,
        },
    },
    {
        name: "Cancha de Fútbol",
        address: "500m oeste del centro",
        description: "Campo deportivo de la comunidad",
        type: "Deportes",
        icon: "futbol",
        zone: "Oeste",
        position: {
            lat: 9.8751234,
            lng: -84.0812345,
        },
    },
    {
        name: "Panadería Don Carlos",
        address: "300m este de la iglesia",
        description: "Panadería artesanal local",
        type: "Comercio",
        icon: "bread-slice",
        zone: "Este",
        rating: "4.6★",
        position: {
            lat: 9.8753456,
            lng: -84.0745678,
        },
    },
    {
        name: "Salón Comunal",
        address: "Al lado del parque",
        description: "Centro para eventos y reuniones",
        type: "Comunitario",
        icon: "users",
        zone: "Centro",
        position: {
            lat: 9.8746789,
            lng: -84.0771234,
        },
    },
    {
        name: "Farmacia San Rafael",
        address: "100m norte del EBAIS",
        description: "Farmacia local con medicamentos básicos",
        type: "Salud",
        icon: "prescription-bottle",
        zone: "Sur",
        rating: "4.0★",
        position: {
            lat: 9.8725678,
            lng: -84.0773456,
        },
    },
];

// Inicializar el mapa cuando se cargue la API
initMap();
