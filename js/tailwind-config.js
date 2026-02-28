tailwind.config = {
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                pawgreen: '#009175',
                pawmint: '#bddfcf',
                pawgold: '#db8f12',
                pawbg: '#f8f9fa',
                pawbgdark: '#0f172a', // slate-900 equivalent for dark mode background
                pawtext: '#1a1a1a',
                pawtextdark: '#f1f5f9', // slate-100 equivalent for dark mode text
                pawmintdark: '#0d9488', // darker mint/teal for dark mode
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            }
        }
    }
}
