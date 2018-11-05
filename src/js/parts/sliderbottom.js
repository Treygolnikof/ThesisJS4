function sliderBottom() {
    let slideIndex = 0,
        slides = document.querySelectorAll('.feedback-slider-item'),
        slideInterval = setInterval(autoShowSlides, 3000),
        feedbackDiv = document.querySelector('.feedback'),
        prev = document.querySelector('.main-prev-btn'),
        next = document.querySelector('.main-next-btn');
    
    autoShowSlides(slideIndex);

    function slideCondition(index) {
        if (index > slides.length - 1) {
            slideIndex = 0;
        }
        if (index < 0) {
            slideIndex = slides.length - 1;
        }
        
        slides.forEach((item) => item.style.display = 'none');
    }

    function slideClass(side) {
        slides[slideIndex].style.display = 'block';
        slides[slideIndex].classList.add('animated');
        slides[slideIndex].classList.add('fadeIn' + side);
    }

    function autoShowSlides(index) {
        slideCondition(index);
        slideIndex = (slideIndex + 1) % slides.length;
        slideClass('Right');
    }

    function showSlides(index, side, remove) {
        slideCondition(index);
        slides[slideIndex].classList.remove('fadeIn' + remove);
        slideClass(side);
    }

    function plusSlides(index) {
        if (index < 0) {
            showSlides(slideIndex += index, 'Left', 'Right');
        } else {
            showSlides(slideIndex += index, 'Right', 'Left');
        }
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });

    feedbackDiv.addEventListener('mouseover', () => {
        clearInterval(slideInterval);
    });

    feedbackDiv.addEventListener('mouseout', () => {
        slideInterval = setInterval(autoShowSlides, 3000);
    });
}

export default sliderBottom;