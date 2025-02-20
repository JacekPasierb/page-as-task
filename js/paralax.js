document.addEventListener("DOMContentLoaded", function () {
  const parallaxImage = document.querySelector(".dogImage");
  const parallaxSection = document.querySelector(".content__image"); // Rodzic psa

  if (!parallaxImage || !parallaxSection) return;
  function applyParallax() {
    let sectionTop = parallaxSection.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    let sectionHeight = parallaxSection.offsetHeight;

    if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
      let scrollFactor = (windowHeight - sectionTop) / windowHeight;
      let translateY = Math.max(-80, scrollFactor * 80);
      parallaxImage.style.transform = `translateY(${translateY}px)`;
    } else {
      parallaxImage.style.transform = `translateY(0px)`;
    }
  }

  window.addEventListener("scroll", applyParallax);
  applyParallax();
});
