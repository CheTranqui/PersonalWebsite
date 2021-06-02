// file that sets light and dark mode CSS variables for color

function activateLightMode() {
    const root = document.documentElement;
    //light mode colors
    root.style.setProperty('--color-primaryBackground', '#fff');
    root.style.setProperty('--color-secondaryBackground', '#eee');
    root.style.setProperty('--color-primaryTitle', '#38a2c2');
    root.style.setProperty('--color-primaryText', '#123');
    root.style.setProperty('--color-fadedText', '#666');
    root.style.setProperty('--color-links', '#01afa7');
    root.style.setProperty('--color-inlineLinks', '#01c8bf');
    root.style.setProperty('--color-carouselButtons', 'rgba(200,200,200,0.6)');
    root.style.setProperty('--color-carouselButtonText', 'darkgray');
}

function activateDarkMode() {
    const root = document.documentElement;
    // dark mode colors
    root.style.setProperty('--color-primaryBackground', '#123');
    root.style.setProperty('--color-secondaryBackground', '#222');
    root.style.setProperty('--color-primaryTitle', '#38a2c2');
    root.style.setProperty('--color-primaryText', '#f0f8ff');
    root.style.setProperty('--color-fadedText', '#808080');
    root.style.setProperty('--color-links', '#1ec8af');
    root.style.setProperty('--color-inlineLinks', '#9CFFDE');
    root.style.setProperty('--color-carouselButtons', 'rgba(255,255,255,0.3)');
    root.style.setProperty('--color-carouselButtonText', 'black');
}