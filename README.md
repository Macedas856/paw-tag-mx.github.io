# Paw Tag Landing & Ecosystem 🐾

Bienvenidos al código de **Paw Tag** ("El ecosistema de seguridad y bienestar para tu compañero"). Esta es la Landing Page y el portal digital para el ecosistema de medallas inteligentes (NFC/QR/Bluetooth) compatibles con Apple Find My y Android Find Hub.

## 🤖 Contexto para Desarrolladores y AI Agents (Antigravity)

**Hola Dev / AI Agent (Antigravity):**
Si estás leyendo esto, estás a punto de trabajar en el repositorio de Paw Tag. Este README contiene el contexto arquitectónico y de decisiones del proyecto para que puedas continuar desarrollando rápido y sin romper nada.

### 🛠 Stack Tecnológico
- **Core:** HTML5 Semántico, Vanilla JavaScript.
- **Estilos:** Tailwind CSS (cargado via CDN en `js/tailwind-config.js` y clases en los HTML) y estilos base Vanilla en `css/style.css`.
- **Soporte:** **NO** hay framework de JS (React/Vue/Next). Todo es estático y renderizado en el cliente.
- **Alojamiento:** GitHub Pages (Despliegue directo de archivos estáticos).

### 📁 Estructura del Proyecto
- `index.html`: Landing page principal (Hero, Beneficios, Cómo Funciona, B2B, FAQ).
- `activar.html`: Página de vinculación y bienvenida para nuevos usuarios con tutorial en video.
- `manual.html`: Manual de usuario y troubleshooting del modelo "Loshall".
- `/js/main.js`: Lógica principal UI (Dark Mode, Menú móvil) y **Analíticas de GA4**.
- `/js/i18n.js`: Motor personalizado de internacionalización.
- `/js/tailwind-config.js`: Configuración in-line de los colores de la marca para Tailwind CDN.
- `/locales/`: Archivos JSON (`es.json`, `en.json`, `pt.json`) con las traducciones.
- `/css/style.css`: Ajustes globales (como colores de scrollbar, estilos base que Tailwind no cubre).
- `/img/`: Activos visuales (logos, fotografías, mockups, íconos SVG).

### 🌍 Sistema de Internacionalización (i18n)
La página soporta Español, Inglés y Portugués.
- El texto no se escribe directamente (hardcoded) en el HTML. Se utiliza el atributo `data-i18n="ruta.de.la.key"`.
- Los textos base están en `/locales/es.json` y se cargan asincrónicamente con `/js/i18n.js`.
- Cambiar un texto requiere editar los 3 archivos JSON o pedir a la IA que traduzca las nuevas llaves.

### 🌗 Dark Mode
- Implementado usando las clases `dark:` de Tailwind.
- La lógica de estado (localStorage) y el control de los botones "sol/luna" del NavBar viven en `main.js`. El color base oscuro y blanco es manejado automáticamente sobre un `<body class="...">`.

### 📈 Google Analytics 4 (GA4) Avanzado
- **ID del Data Stream:** `G-CSW5J7TQ0X`.
- **Etiqueta Principal:** Ubicada de forma nativa en el `<head>` de `index.html`, `activar.html` y `manual.html`.
- **Rastreo de Eventos Avanzados:** La lógica vive exclusivamente en `/js/main.js` bajo un wrapper seguro `trackEvent()`.
  
  **Eventos Críticos (Conversiones configurables en GA4):**
  1. `click_activacion_tag`: Evento en `Engagement_Activacion`. Para embudo "Landing -> Activar".
  2. `intent_compra_tiktok`: (CRÍTICO - e-commerce) Disparado cuando intentan comprar. Va acompañado de un `begin_checkout` estándar para medir el valor ($349 MXN).
  3. `click_descarga_app`: Evento en `Adquisicion_App`. Pasa el parámetro de plataforma (iOS/Android) como propiedad.
  4. `generar_lead_b2b`: Evento en `Leads_B2B`. Informa métricas de leads comerciales (B2B, WhatsApp, Email).
  5. `lectura_faq` e `intento_ver_video`: Rastrea comportamiento analítico en páginas base y videos.

---

*Desarrollador / Agente:* Siempre que hagas un PR o adiciones nuevo código (ej. un nuevo botón de compra), **actualiza los selectores en `js/main.js`** o crea el evento correspondiente para no romper el ecosistema de analíticas de GA4.
