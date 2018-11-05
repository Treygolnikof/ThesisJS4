function sliderTop() {
    let slideIndex = 0,
        slides = document.querySelectorAll('.main-slider-item'),
        slideInterval = setInterval(showSlides, 5000);
    
    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 0;
        }

        slides.forEach((item) => item.style.display = 'none');

        slideIndex = (slideIndex + 1) % slides.length;

        slides[slideIndex].style.display = 'block';
        slides[slideIndex].classList.add('animated');
        slides[slideIndex].classList.add('fadeInDown');
    }
}

export default sliderTop;