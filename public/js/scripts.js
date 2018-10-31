var bg = document.querySelector('.product-banner-bg');
var windowWidth = window.innerWidth / 5;
var windowHeight = window.innerHeight / 5;

bg.addEventListener('mousemove', function (e) {
  var mouseX = e.clientX / windowWidth;
  var mouseY = e.clientY / windowHeight;

  bg.style.transform = 'translate3d(-' + mouseX + '%, -' + mouseY + '%, 0)';
});
