
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
          setupNavigationLinks(); // Настраиваем навигационные ссылки после загрузки header
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
              setTimeout(initializeSlider, 100); // Инициализируем слайдер для домашней страницы
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



const dishes = [
  { id: 1, name: "Блюдо №1", ingredients: "Состав блюда 1", url: "./img/hero/desktop-hero512.png" },
  { id: 2, name: "Блюдо №2", ingredients: "Состав блюда 2", url: "./img/hero/desktop-hero-2.png" },
  { id: 3, name: "Блюдо №3", ingredients: "Состав блюда 3", url: "./img/hero/desktop-hero-3.png" },
];

function initializeSlider() {
  console.log('Initializing slider');
  const sliderLine = document.querySelector('.slider .slider-line');
  const dishNamesContainer = document.querySelector('.dish-names-container');

  if (!sliderLine || !dishNamesContainer) {
      console.error('Slider elements not found');
      return;
  }

  sliderLine.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов

  dishes.forEach(dish => {
      const slide = document.createElement('div');
      slide.classList.add('img-hero');

      const content = `
          <img class="img-hero-desktop" src="${dish.url}" alt="${dish.name}" width="100%"/>
      `;

      slide.innerHTML = content;
      sliderLine.appendChild(slide);
  });

  const images = document.querySelectorAll('.slider .slider-line .img-hero');
  let count = 1;
  let width;
  let isAnimating = false;

  function init() {
      width = document.querySelector('.slider').offsetWidth;
      sliderLine.style.width = width * (images.length + 2) + 'px';
      images.forEach(item => {
          item.style.width = width + 'px';
          item.style.height = 'auto';
      });
      rollSlider();
      updateDishName();
  }

  function rollSlider() {
      isAnimating = true;
      sliderLine.style.transition = 'transform 0.5s';
      sliderLine.style.transform = 'translate(-' + count * width + 'px)';
  }

  function handleTransitionEnd() {
      if (count === 0) {
          sliderLine.style.transition = 'none';
          count = images.length;
          sliderLine.style.transform = 'translate(-' + count * width + 'px)';
      } else if (count === images.length + 1) {
          sliderLine.style.transition = 'none';
          count = 1;
          sliderLine.style.transform = 'translate(-' + count * width + 'px)';
      }
      isAnimating = false;
      updateDishName();
  }

  function updateDishName() {
      const currentDish = dishes[(count - 1) % dishes.length];
      dishNamesContainer.innerHTML = `<h3 class="name-of-dishes">${currentDish.name}</h3>`;
  }

  init();
  window.addEventListener('resize', init);
  sliderLine.addEventListener('transitionend', handleTransitionEnd);

  document.querySelector('.right-btn').addEventListener('click', function () {
      if (!isAnimating) {
          count--;
          rollSlider();
      }
  });

  document.querySelector('.left-btn').addEventListener('click', function () {
      if (!isAnimating) {
          count++;
          rollSlider();
      }
  });

  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);

  sliderLine.appendChild(firstClone);
  sliderLine.insertBefore(lastClone, images[0]);

  updateDishName();
}