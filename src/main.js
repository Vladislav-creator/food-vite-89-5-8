let offset = 0; //смещение от левого края
const sliderLine = document.querySelector('.slider-line');
document.querySelector('.left-btn').addEventListener('click', function () {
  offset = offset + 511; // += 511;
  if (offset > 1022) {
    offset = 0;
  }
  sliderLine.style.left = -offset + 'px';
});
document.querySelector('.right-btn').addEventListener('click', function () {
  offset = offset - 511; // -= 511;
  if (offset < 0) {
    offset = 1022;
  }
  sliderLine.style.left = -offset + 'px';
});
