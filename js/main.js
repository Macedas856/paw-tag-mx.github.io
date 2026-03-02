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
});
