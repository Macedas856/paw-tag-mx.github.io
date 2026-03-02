document.addEventListener('DOMContentLoaded', () => {
    // ==== Dark Mode Logic ====
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const themeToggleDarkIcons = document.querySelectorAll('#theme-toggle-dark-icon, #theme-toggle-dark-icon-mobile');
    const themeToggleLightIcons = document.querySelectorAll('#theme-toggle-light-icon, #theme-toggle-light-icon-mobile');

    if (themeToggleBtns.length > 0) {
        // Initial setup - Light theme by default
        if (localStorage.getItem('color-theme') === 'dark') {
            themeToggleLightIcons.forEach(icon => icon.classList.remove('hidden'));
            document.documentElement.classList.add('dark');
        } else {
            themeToggleDarkIcons.forEach(icon => icon.classList.remove('hidden'));
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Toggle icons across all buttons
                themeToggleDarkIcons.forEach(icon => icon.classList.toggle('hidden'));
                themeToggleLightIcons.forEach(icon => icon.classList.toggle('hidden'));

                // Toggle theme and save to localStorage
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            });
        });
    }

    // ==== Mobile Menu Logic ====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ==== Google Analytics 4 (GA4) Advanced Event Tracking ====

    // Función ayudante para enviar eventos de forma segura
    const trackEvent = (eventName, eventParams) => {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
        } else {
            console.warn(`GA4 no cargado. Evento: ${eventName}`, eventParams);
        }
    };

    // 1. Rastrear clicks en "Activar mi Tag" (Cualquier enlace a activar.html)
    // Esto es crítico para tu embudo de activación
    const linksActivar = document.querySelectorAll('a[href*="activar.html"]');
    linksActivar.forEach(link => {
        link.addEventListener('click', (e) => {
            const location = link.closest('nav') ? 'navbar' :
                link.closest('footer') ? 'footer' : 'hero_section';

            trackEvent('click_activacion_tag', {
                'event_category': 'Engagement_Activacion',
                'event_label': 'Botón Activar',
                'button_location': location
            });
        });
    });

    // 2. Rastrear visitas a la Tienda (TikTok) 
    // Crítico para medir Intentos de Compra (Checkout Starts)
    const linksTienda = document.querySelectorAll('a[href*="tiktok.com/ZS9evQ5ffuQDV-RH0E3"]');
    linksTienda.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('intent_compra_tiktok', {
                'event_category': 'Ventas',
                'event_label': 'Botón Comprar en TikTok'
            });
            // También disparamos el evento estándar de e-commerce de GA4
            trackEvent('begin_checkout', {
                items: [
                    {
                        item_name: "Paw Tag Smart Tag",
                        currency: "MXN",
                        price: 349.00
                    }
                ]
            });
        });
    });

    // 3. Rastrear intención de Descarga de App (iOS/Android)
    const linksDescarga = document.querySelectorAll('a[href*="apps.apple.com"], a[href*="play.google.com"]');
    linksDescarga.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = link.href.includes('apple') ? 'iOS' : 'Android';
            trackEvent('click_descarga_app', {
                'event_category': 'Adquisicion_App',
                'event_label': `Descarga ${platform}`,
                'platform': platform
            });
        });
    });

    // 4. Rastrear Contactos B2B (WhatsApp y Email)
    const linksContacto = document.querySelectorAll('a[href*="wa.me"], a[href^="mailto:"]');
    linksContacto.forEach(link => {
        link.addEventListener('click', (e) => {
            const method = link.href.includes('wa.me') ? 'WhatsApp' : 'Email';
            trackEvent('generar_lead_b2b', {
                'event_category': 'Leads_B2B',
                'event_label': `Contacto por ${method}`,
                'method': method
            });
        });
    });

    // 5. Rastrear interacciones con Preguntas Frecuentes (FAQ)
    // Ayuda a saber qué dudas tiene más la gente
    const faqDetails = document.querySelectorAll('details');
    faqDetails.forEach(detail => {
        detail.addEventListener('toggle', (e) => {
            if (detail.open) { // Solo medimos cuando lo abren
                const questionText = detail.querySelector('summary').innerText.trim();
                trackEvent('lectura_faq', {
                    'event_category': 'Soporte_Info',
                    'event_label': questionText
                });
            }
        });
    });

    // 6. Rastrear Reproducción de Videos (YouTube tutoriales)
    // Nota: Para YouTube iframes es más complejo, pero si tienen enlaces directos u otros videos
    const iframeVideos = document.querySelectorAll('iframe[src*="youtube.com"]');
    // Para simplificar, si el usuario hace hover o click sobre el contenedor del video
    iframeVideos.forEach(iframe => {
        const container = iframe.parentElement;
        if (container) {
            container.addEventListener('click', () => {
                trackEvent('intento_ver_video', {
                    'event_category': 'Soporte_Video',
                    'event_label': iframe.src
                });
            }, { once: true }); // Solo lo contamos una vez por recarga
        }
    });
});
