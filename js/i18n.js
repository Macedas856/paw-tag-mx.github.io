// Base URL path for loading translation JSONs
const localesPath = './locales/';

document.addEventListener('DOMContentLoaded', () => {
    // Ensure translation happens immediately on load
    const savedLang = localStorage.getItem('app-lang') || 'es'; // default to 'es'
    setLanguage(savedLang);

    // Setup language switcher dropdown interaction
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});

/**
 * Fetch a JSON file containing the translations for a given language code.
 */
async function loadTranslations(lang) {
    try {
        const response = await fetch(`${localesPath}${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${lang}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Apply loaded translations to the active DOM.
 */
async function setLanguage(lang) {
    const translations = await loadTranslations(lang);
    if (!translations) return;

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Save to local storage
    localStorage.setItem('app-lang', lang);

    // Find all elements with data-i18n attribute
    const iterators = document.querySelectorAll('[data-i18n]');
    iterators.forEach(element => {
        const key = element.getAttribute('data-i18n');

        // Handle nested keys like "hero.title"
        const keys = key.split('.');
        let translationValue = translations;
        for (const k of keys) {
            if (translationValue) {
                translationValue = translationValue[k];
            }
        }

        if (translationValue) {
            // Check if we need to set placeholder or innerHTML
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translationValue;
            } else {
                element.innerHTML = translationValue;
            }
        }
    });

    // Also handle dynamic meta tags if needed
    if (translations.meta) {
        const titleTag = document.querySelector('title');
        const descTag = document.querySelector('meta[name="description"]');

        if (titleTag && translations.meta.title) titleTag.textContent = translations.meta.title;
        if (descTag && translations.meta.description) descTag.setAttribute('content', translations.meta.description);
    }
}
