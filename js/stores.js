// js/stores.js

// Lista de tiendas físicas (Fácil de actualizar)
const STORES = [
    {
        name: "Pet N'Go Condesa",
        address: "Condesa, CDMX",
        lat: 19.4103763,
        lng: -99.1690439,
        url: "https://www.google.com/maps/place/Pet+N'Go+Condesa/@19.4121181,-99.172742,15.48z/data=!4m6!3m5!1s0x85d1ff40432d67ef:0x6598c81c7d1d56c9!8m2!3d19.4103763!4d-99.1690439!16s%2Fg%2F1x5fbq5_?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        name: "Pet N'Go Polanco",
        address: "Polanco, CDMX",
        lat: 19.4363445,
        lng: -99.1854093,
        url: "https://www.google.com/maps/place/Pet+N'Go+Polanco/@19.4363445,-99.1879842,17z/data=!3m2!4b1!5s0x85d1f8abe3e7d3f7:0x9c9e84abac5e8317!4m6!3m5!1s0x85d1f9d2bcd79cd3:0x5834c31e01c01091!8m2!3d19.4363445!4d-99.1854093!16s%2Fg%2F1yg93k8gd?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        name: "Pet N'Go Narvarte",
        address: "Narvarte, CDMX",
        lat: 19.3738038,
        lng: -99.1555827,
        url: "https://www.google.com/maps/place/Pet+N'Go+Narvarte/@19.3738038,-99.1581576,17z/data=!3m1!4b1!4m6!3m5!1s0x85cdff010800c6df:0xacd0feed5f08a9ac!8m2!3d19.3738038!4d-99.1555827!16s%2Fg%2F11n14km2ym?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        name: "Pet Atelier",
        address: "Polanco, CDMX",
        lat: 19.4327376,
        lng: -99.1743729,
        url: "https://www.google.com/maps/place/Pet+Atelier/@19.4327376,-99.1769478,17z/data=!3m1!4b1!4m6!3m5!1s0x85d1ff34824a1439:0x5ccefbd72756b682!8m2!3d19.4327376!4d-99.1743729!16s%2Fg%2F11kkyz4rj7?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        name: "Woof Miaow",
        address: "Narvarte, CDMX",
        lat: 19.3758301,
        lng: -99.1580984,
        url: "https://www.google.com/maps/place/Woof+Miaow/@19.3758301,-99.1606733,17z/data=!3m1!4b1!4m6!3m5!1s0x85d1ffef85e27063:0xfc8e980a12ab3f73!8m2!3d19.3758301!4d-99.1580984!16s%2Fg%2F11kf6wdv8n?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
    }
];

// Instancia global para poder repintar
let currentStores = [...STORES];

document.addEventListener('DOMContentLoaded', () => {
    const storesGrid = document.getElementById('stores-grid');
    const locateBtn = document.getElementById('btn-locate-user');

    if (!storesGrid) return; // Si no estamos en la página correcta, no hacemos nada

    // Renderizar la lista
    const renderStores = (stores) => {
        storesGrid.innerHTML = '';
        stores.forEach(store => {
            const distanceHtml = store.distance ? `<div class="mt-2 text-sm text-pawgreen dark:text-pawmint font-semibold">${store.distance.toFixed(1)} km de distancia</div>` : '';

            const card = document.createElement('a');
            card.href = store.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = "bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 flex flex-col group cursor-pointer block transform hover:-translate-y-1";

            card.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-pawmint/20 dark:bg-pawmintdark/20 rounded-2xl flex items-center justify-center text-pawgreen dark:text-pawmint group-hover:scale-110 transition-transform">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <!-- Icono para ir -->
                    <div class="text-gray-300 dark:text-gray-600 group-hover:text-pawgreen dark:group-hover:text-pawmint transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-1 text-pawtext dark:text-pawtextdark group-hover:text-pawgreen dark:group-hover:text-pawmint transition-colors">${store.name}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">${store.address}</p>
                ${distanceHtml}
            `;

            // Evento GA4
            card.addEventListener('click', () => {
                if (typeof gtag === 'function') {
                    gtag('event', 'click_tienda_fisica', {
                        'event_category': 'Ventas_Fisicas',
                        'event_label': store.name
                    });
                }
            });

            storesGrid.appendChild(card);
        });
    };

    renderStores(currentStores);

    // Calcular distancia con Fórmula de Haversine
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    };

    // Ordenar por ubicación
    if (locateBtn) {
        locateBtn.addEventListener('click', () => {
            if ("geolocation" in navigator) {
                // Tracking GA4
                if (typeof gtag === 'function') {
                    gtag('event', 'solicitar_ubicacion_tiendas', {
                        'event_category': 'Interacciones_UI',
                        'event_label': 'Botón Mostrar Cercanas'
                    });
                }

                locateBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando...
                `;
                locateBtn.disabled = true;

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;

                        // Añadir distancia y ordenar
                        currentStores = currentStores.map(store => ({
                            ...store,
                            distance: getDistanceFromLatLonInKm(userLat, userLng, store.lat, store.lng)
                        })).sort((a, b) => a.distance - b.distance);

                        renderStores(currentStores);

                        locateBtn.innerHTML = `
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Ordenado por cercanía
                        `;
                    },
                    (error) => {
                        console.error('Error obteniendo ubicación:', error);
                        alert("No pudimos obtener tu ubicación. Asegúrate de dar los permisos correspondientes al navegador.");

                        // Restaurar botón
                        locateBtn.innerHTML = `
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Mostrar tiendas más cercanas
                        `;
                        locateBtn.disabled = false;
                    }
                );
            } else {
                alert("La geolocalización no es compatible con este navegador.");
            }
        });
    }
});
