document.addEventListener('DOMContentLoaded', function () {
    const htmlElement = document.documentElement;
    const navbar = document.getElementById('navbar');
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // See if there is a storedTheme available.
    let storedTheme = window.localStorage.getItem('stored_theme') ?? null;

    // Call toggleTheme with the storedTheme to persist the theme after navigation events.
    toggleTheme(navbar, themeIcon, htmlElement, storedTheme);

    // Add 'click' event listener that toggles the theme (don't pass a stored theme so it's overwritten.)
    toggleButton.addEventListener('click', (event) => {
        event.preventDefault();

        toggleTheme(navbar, themeIcon, htmlElement, null);
    });
});

toggleTheme = (navbar, themeIcon, htmlElement, storedTheme) => {

    let currentTheme, newTheme, currentColor, newColor, currentBackground, newBackground, oldIcon, newIcon;

    if (storedTheme !== null) {
        let currentTheme = storedTheme;
        newTheme = currentTheme;
        currentColor = (currentTheme === 'light') ? 'text-dark' : 'text-white';
        newColor = (currentColor === 'text-white') ? 'text-dark' : 'text-white';
        currentBackground = (currentTheme === 'light') ? 'bg-dark' : 'bg-white';
        newBackground  = (currentBackground === 'bg-white') ? 'bg-dark' : 'bg-white';
        oldIcon = (currentTheme === 'light') ? 'fa-sun' : 'fa-moon';
        newIcon = (oldIcon === 'fa-moon') ? 'fa-sun' : 'fa-moon';
    } else {
        currentTheme = htmlElement.getAttribute('data-bs-theme');
        newTheme = (currentTheme === 'light') ? 'dark' : 'light';
        currentColor = (currentTheme === 'light') ? 'text-white' : 'text-dark';
        newColor = (currentColor === 'text-white') ? 'text-dark' : 'text-white';
        currentBackground = (currentTheme === 'light') ? 'bg-white' : 'bg-dark';
        newBackground  = (currentBackground === 'bg-white') ? 'bg-dark' : 'bg-white';
        oldIcon = (currentTheme === 'light') ? 'fa-moon' : 'fa-sun';
        newIcon = (oldIcon === 'fa-moon') ? 'fa-sun' : 'fa-moon';
    }

    // Overwrite storedTheme with newTheme
    window.localStorage.setItem('stored_theme', newTheme);

    navbar.classList.remove(newBackground);
    navbar.classList.remove(currentColor);
    navbar.classList.add(newColor);
    navbar.classList.add(currentBackground);
    themeIcon.classList.remove(oldIcon);
    themeIcon.classList.add(newIcon);
    
    htmlElement.setAttribute('data-bs-theme', newTheme);
}