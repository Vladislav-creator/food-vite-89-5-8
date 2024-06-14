
const images = document.querySelectorAll('.slider .slider-line .img-hero');
const sliderLine = document.querySelector('.slider .slider-line');
let count = 1;
let width;
let isAnimating = false; // Флаг для отслеживания анимации

function init() {
  console.log('resize');
  width = document.querySelector('.slider').offsetWidth;
  sliderLine.style.width = width * (images.length + 2) + 'px'; // Добавляем 2 для клонированных изображений
  images.forEach(item => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });

 
  rollSlider();
}

function rollSlider() {
  isAnimating = true; // Устанавливаем флаг анимации в true
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
  isAnimating = false; // Сбрасываем флаг анимации в false
}

init();
window.addEventListener('resize', init);
sliderLine.addEventListener('transitionend', handleTransitionEnd);

document.querySelector('.left-btn').addEventListener('click', function () {
  if (!isAnimating) { // Проверяем, идет ли анимация
    count++;
    rollSlider();
  }
});

document.querySelector('.right-btn').addEventListener('click', function () {
  if (!isAnimating) { // Проверяем, идет ли анимация
    count--;
    rollSlider();
  }
});

// Клонируем первое и последнее изображения
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

sliderLine.appendChild(firstClone);
sliderLine.insertBefore(lastClone, images[0]);