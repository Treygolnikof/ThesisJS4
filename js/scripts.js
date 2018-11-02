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
                    btn.remove();
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
            numMask[i].addEventListener('keyup', () => {
                numMask[i].maxLength = 17;
                numMask[i].value = numMask[i].value.replace('+7', "");
                numMask[i].value = numMask[i].value.replace(/\D/g, "");
                numMask[i].value = numMask[i].value.replace(/^(\d{3})(\d)/g, "($1) $2");
                numMask[i].value = '+7 ' + numMask[i].value.replace(/(\d{3})(\d)/, "$1-$2");
            });
        }

        for (let i = 0; i < nameMask.length; i++) {
            nameMask[i].addEventListener('input', () => {
                nameMask[i].value = nameMask[i].value.replace(/[^а-яА-ЯёЁ]/ig, '');
            });
        }

        comMask.addEventListener('input', () => {
            comMask.value = comMask[i].value.replace(/[^а-яА-ЯёЁ/./ /,]/ig, '');
        });
    }
    mask();

    // Form 

    function forms() {
        let formDes = document.querySelector('.popup-design form'),
            formCons = document.querySelector('.popup-consultation form'),
            contDes = document.querySelector('.popup-design .popup-content'),
            contCons = document.querySelector('.popup-consultation .popup-content'),
            statusMessage = document.createElement('div');
        
            statusMessage.classList.add('status');
    
        function sendForm(elem, cont) {
            elem.addEventListener('submit', (event) => {
                event.preventDefault(); 
                elem.style.display = 'block';
                cont.appendChild(statusMessage);
    
                let formData = new FormData(elem);
    
                function postData(data) {
                    return new Promise( function(resolve, reject) {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                        let obj = {};
                        formData.forEach( function(value, key) {
                            obj[key] = value;
                        });
                        data = JSON.stringify(obj);
    
                        request.onreadystatechange = () => {
                            if (request.readyState < 4) {
                                resolve();
                            } else if(request.readyState === 4) {
                                if (request.status == 200 && request.status < 300) {
                                    resolve();
                                }
                                else {
                                    reject();
                                }
                            }
                        };
                        request.send(data);
                    });
                }

                postData(formData)
                    .then(() => statusMessage.innerHTML = 'Идёт загрузка...')
                    .then(() => {
                        elem.style.display = 'none';
                        statusMessage.innerHTML = 'Спасибо за заявку';
                    })
                    .catch(() => {
                        elem.style.display = 'none';
                        statusMessage.innerHTML = 'Произошла ошибка';
                    })
            });
        }
    
        sendForm(formDes, contDes);
        sendForm(formCons, contCons);
    }
    forms();

    // Calc

    function calc() {
        let selSize = document.getElementById('size'),
            selMaterial = document.getElementById('material'),
            selOptions = document.getElementById('options'),
            totalValue = document.getElementsByClassName('calc-price')[0],
            promoInput = document.getElementsByClassName('promocode')[0],
            sizeValue = 0,
            matValue = 0,
            optValue = 0,
            total = 0;

        selSize.addEventListener('change', () =>{
            sizeValue = +this.value;
            total = sizeValue + matValue + optValue;
            if (sizeValue == 0 || matValue == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        selMaterial.addEventListener('change', () => {
            matValue = +this.value;
            total = sizeValue + matValue + optValue;
            if (sizeValue == 0 || matValue == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        selOptions.addEventListener('change', () => {
            optValue = +this.value;
            total = sizeValue + matValue + optValue;
            if (sizeValue == 0 || matValue == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        })

        promoInput.addEventListener('input', () => {
            if (promoInput.value != "IWANTPOPART" && sizeValue != 0 && matValue != 0) {
                totalValue.innerHTML = total;
            } else {
                totalValue.innerHTML = total * 0.7;
            }
            
        });
    }
    calc();

    // Block Filtering

    function filterBlock() {
        let portfMenu = document.querySelector('.portfolio-menu'),
            portfLi = portfMenu.querySelectorAll('li'),
            portfWrap = document.querySelector('.portfolio-wrapper'),
            portNo = document.querySelector('.portfolio-no'),
            images = portfWrap.querySelectorAll('.portfolio-block');

        portfMenu.addEventListener('click', (e) => {
            if (e.target.matches('li')) {
                portfLi.forEach((item) => item.classList.remove('active'));
                e.target.classList.add('active');
                if (e.target.matches('.grandmother') || e.target.matches('.granddad')) {
                    portfWrap.style.display = 'none';
                    portNo.style.display = 'block';
                } else {
                    portNo.style.display = 'none';
                    portfWrap.style.display = 'flex';
                    images.forEach((img) => img.style.display = 'none');
                    for (let i = 0; i < images.length; i++) {
                        if (images[i].classList[2] == e.target.classList[0] || e.target.classList[0] == 'all') {
                            images[i].style.display = 'block';
                        }
                    }
                }
            }
        });
    }
    filterBlock();

    // Hover Picture

    function hoverPicture() {
        let sizeBlocks = document.querySelectorAll('.sizes-block'),
            img = document.querySelectorAll('.sizes-wrapper img');

        for (let i = 0; i < sizeBlocks.length; i++) {
            sizeBlocks[i].addEventListener('mouseover', () => {
                img[i].setAttribute("src", "img/sizes-" + (i + 1) + "-1.png");
                img[i].style.zIndex = '5';
            });
            sizeBlocks[i].addEventListener('mouseout', () => {
                img[i].setAttribute("src", "img/sizes-" + (i + 1) + ".png");
                img[i].style.zIndex = '0';
            });
            sizeBlocks[i].addEventListener('touchstart', () => {
                img[i].setAttribute("src", "img/sizes-" + (i + 1) + "-1.png");
                img[i].style.zIndex = '5';
            });
            sizeBlocks[i].addEventListener('touchleave', () => {
                img[i].setAttribute("src", "img/sizes-" + (i + 1) + ".png");
                img[i].style.zIndex = '0';
            });
        }
    }
    hoverPicture();

    // Slider Bottom 

    function sliderBottom() {
        let slideIndex = 0,
            slides = document.querySelectorAll('.feedback-slider-item'),
            slideInterval = setInterval(showSlides, 5000),
            prev = document.querySelector('.main-prev-btn'),
            next = document.querySelector('.main-next-btn');

        showSlides(slideIndex);

        function showSlides(n) {
            if (n > slides.length) {
                slideIndex = 0;
            }

            slides.forEach((item) => item.style.display = 'none');

            slideIndex = (slideIndex + 1) % slides.length;

            slides[slideIndex].style.display = 'block';
            slides[slideIndex].classList.add('animated');
            slides[slideIndex].classList.add('fadeInRight');
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        prev.addEventListener('click', function() {
            plusSlides(-1);
        });

        next.addEventListener('click', function() {
            plusSlides(1);
        });
    }
    sliderBottom();
});