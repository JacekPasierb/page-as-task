document.addEventListener("DOMContentLoaded", function () {
    const parallaxImage = document.querySelector(".dogImage");
    const parallaxSection = document.querySelector(".content__image"); // Rodzic psa

    window.addEventListener("scroll", function () {
        if (!parallaxImage || !parallaxSection) return;

        let sectionTop = parallaxSection.getBoundingClientRect().top; 
        let windowHeight = window.innerHeight; 

        if (sectionTop < windowHeight && sectionTop > -parallaxSection.offsetHeight) {
            let scrollFactor = sectionTop / windowHeight; 
            let translateY = scrollFactor * -50; 
            parallaxImage.style.transform = `translateY(${translateY}px)`;
        }
    });
});
