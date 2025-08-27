document.addEventListener('DOMContentLoaded', function() {
    const scriptTag = document.querySelector('script[src$="js/common.js"]');
    const basePath = scriptTag.getAttribute('data-base-path') || '';

    // Load Header
    fetch(basePath + 'header.html')
        .then(response => response.ok ? response.text() : Promise.reject('header.html not found'))
        .then(html => {
            // Create a temporary container to parse the HTML and fix paths
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Fix image paths by prepending the base path
            const images = tempDiv.querySelectorAll('img');
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    img.setAttribute('src', basePath + src);
                }
            });

            // Inject the corrected HTML into the placeholder
            document.getElementById('header-placeholder').innerHTML = tempDiv.innerHTML;

            // --- Hamburger Menu Logic ---
            // This code runs *after* the header is loaded
            const hamburger = document.querySelector('.hamburger-menu');
            const navMenu = document.querySelector('.nav-menu');

            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });

                // Optional: Close menu when a link is clicked
                navMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    });
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Contact Section
    fetch(basePath + 'contact-section.html')
        .then(response => response.ok ? response.text() : Promise.reject('contact-section.html not found'))
        .then(html => {
            const container = document.getElementById('contact-social-container');
            if (container) {
                container.innerHTML = html;
            }
        })
        .catch(error => console.error('Error loading contact section:', error));

    // Load Footer
    fetch(basePath + 'footer.html')
        .then(response => response.ok ? response.text() : Promise.reject('footer.html not found'))
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));
});