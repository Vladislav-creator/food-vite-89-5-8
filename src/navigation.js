const routes = {
    '/': './partials/home.html',
    '/home': './partials/home.html',
    '/about': './partials/about.html',
    '/service': './partials/service.html',
    '/menu': './partials/menu.html',
    '/contact': './partials/contact.html',
};

function loadHeaderAndFooter() {
    fetch('./partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#header').innerHTML = data;
            setupNavigationLinks();
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('./partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

function loadPage(path) {
    const contentPath = routes[path] || routes['/'];
    fetch(contentPath)
        .then(response => response.text())
        .then(data => {
            document.querySelector('#main-content').innerHTML = data;
            if (path === '/' || path === '/home') {
                initializeSlider(); // Инициализация слайдера только для домашней страницы
            }
        })
        .catch(error => console.error('Error loading page:', error));
}

function setupNavigationLinks() {
    document.querySelectorAll('a.navigation-link').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const path = this.getAttribute('href');
            history.pushState({}, '', path);
            loadPage(path);
        });
    });
}

window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderAndFooter();
    loadPage(window.location.pathname);
});