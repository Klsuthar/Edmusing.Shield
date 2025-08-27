document.addEventListener('DOMContentLoaded', function() {
    const scriptTag = document.querySelector('script[src$="js/common.js"]');
    const basePath = scriptTag.getAttribute('data-base-path') || '';

    // Load Header
    fetch(basePath + 'header.html')
        .then(response => response.ok ? response.text() : Promise.reject('header.html not found'))
        .then(html => {
            document.getElementById('header-placeholder').innerHTML = html;
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
