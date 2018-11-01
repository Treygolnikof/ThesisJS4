window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // Slider Top

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
    sliderTop();

    // Modal 

    function modals() {
        let desBtn = document.querySelectorAll('.button-design'),
            consBtn = document.querySelectorAll('.button-consultation'),
            gift = document.querySelector('.fixed-gift'),
            popConsClose = document.querySelector('.popup-consultation .popup-close'),
            popDesClose = document.querySelector('.popup-design .popup-close'),
            popGiftClose = document.querySelector('.popup-gift .popup-close'),
            popCons = document.querySelector('.popup-consultation'),
            popDes = document.querySelector('.popup-design'),
            popGift = document.querySelector('.popup-gift');

        function openModals(btn, pop, close) {
            if (btn == gift) {
                btn.addEventListener('click', () => {
                    btn.style.display = 'none';
                    pop.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            } else {
                for (let k = 0; k < btn.length; k++) {
                    btn[k].addEventListener('click', () => {
                        gift.style.display = 'none';
                        pop.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    });
                }
            }


            pop.addEventListener('click', (e) => {
                if (e.target.closest('.popup-content')) {
                    return;
                } else {
                    gift.style.display = 'block';
                    pop.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
    
            close.addEventListener('click', () => {
                gift.style.display = 'block';
                pop.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        openModals(desBtn, popDes, popDesClose);
        openModals(consBtn, popCons, popConsClose);
        openModals(gift, popGift, popGiftClose);
    }
    modals();

    // Phone and Name Mask

    function mask() {
        let nameMask = document.querySelectorAll('input[name="name"]'),
            comMask = document.querySelector('textarea'),
            numMask = document.querySelectorAll('input[name="phone"]');

        for (let i = 0; i < numMask.length; i++) {
            numMask[i].addEventListener('keyup', function() {
                numMask[i].maxLength = 17;
                numMask[i].value = numMask[i].value.replace('+7', "");
                numMask[i].value = numMask[i].value.replace(/\D/g, "");
                numMask[i].value = numMask[i].value.replace(/^(\d{3})(\d)/g, "($1) $2");
                numMask[i].value = '+7 ' + numMask[i].value.replace(/(\d{3})(\d)/, "$1-$2");
            });
        }

        for (let i = 0; i < nameMask.length; i++) {
            nameMask[i].addEventListener('input', function() {
                nameMask[i].value = nameMask[i].value.replace(/[^а-яА-ЯёЁ]/ig, '');
            });
        }

        comMask.addEventListener('input', function() {
            comMask.value = comMask[i].value.replace(/[^а-яА-ЯёЁ/./ /,]/ig, '');
        });
    }
    mask();
});