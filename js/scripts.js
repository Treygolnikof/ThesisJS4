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
            popGift = document.querySelector('.popup-gift'),
            checkClickBtn = false,
            checkModal = false;

        function openModals(btn, pop, close) {
            if (btn == gift) {
                btn.addEventListener('click', () => {
                    btn.remove();
                    pop.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    checkClickBtn = true;
                    checkModal = true;
                });
            } else {
                for (let k = 0; k < btn.length; k++) {
                    btn[k].addEventListener('click', () => {
                        gift.style.display = 'none';
                        pop.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                        checkClickBtn = true;
                        checkModal = true;
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
                    checkModal = false;
                }
            });
    
            close.addEventListener('click', () => {
                gift.style.display = 'block';
                pop.style.display = 'none';
                document.body.style.overflow = '';
                checkModal = false;
            });
        }
        openModals(desBtn, popDes, popDesClose);
        openModals(consBtn, popCons, popConsClose);
        openModals(gift, popGift, popGiftClose);

        //Modal Scroll Gift

        let checkGift = false;

        window.onscroll = function() {
            let scrolled = document.body.scrollHeight - window.pageYOffset;
            if (scrolled < 1500 && !checkGift && !checkClickBtn) {
                gift.remove();
                popGift.style.display = 'block';
                document.body.style.overflow = 'hidden';
                checkGift = true;
            } 
        };

        // Modal Timer

        let timeInterval = setInterval(updateClock, 1000),
            timer = 0;

        function updateClock() {
            timer++;
            if (timer == 60 && !checkModal) {
                clearInterval(timeInterval);
                popCons.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    }
    modals();

    // Phone and Name Mask

    function mask() {
        let nameMask = document.querySelectorAll('input[name="name"]'),
            comMask = document.querySelectorAll('[name="message"]'),
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

        for (let i = 0; i < comMask.length; i++) {
            comMask[i].addEventListener('input', () => {
                comMask[i].value = comMask[i].value.replace(/[^а-яА-ЯёЁ/./ /,]/ig, '');
            });
        }
    }
    mask();

    // Form 

    function forms() {
        let formDes = document.querySelector('.popup-design form'),
            formCons = document.querySelector('.popup-consultation form'),
            formMainCons = document.querySelector('.consultation form'),
            contDes = document.querySelector('.popup-design .popup-content'),
            contCons = document.querySelector('.popup-consultation .popup-content'),
            contMainCons = document.querySelector('.consultation'),
            popConsClose = document.querySelector('.popup-consultation .popup-close'),
            popDesClose = document.querySelector('.popup-design .popup-close'),
            statusMessage = document.createElement('div');

            statusMessage.classList.add('status');
    
        function sendForm(elem, cont, close) {
            elem.addEventListener('submit', (event) => {
                event.preventDefault(); 
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
                        if (elem == formMainCons) {
                            statusMessage.innerHTML = 'Спасибо за заявку!';
                        } else {
                        elem.style.display = 'none';
                        statusMessage.innerHTML = 'Спасибо за заявку!';
                        }
                    })
                    .catch(() => {
                        if (elem == formMainCons) {
                            statusMessage.innerHTML = 'Произошла ошибка!';
                        } else {
                        elem.style.display = 'none';
                        statusMessage.innerHTML = 'Произошла ошибка!';
                        }
                    });
            });

            if (elem == formDes || elem == formCons) {
                close.addEventListener('click', () => {
                    elem.style.display = 'block';
                    statusMessage.remove();
                });
            }
        }
    
        sendForm(formDes, contDes, popDesClose);
        sendForm(formCons, contCons, popConsClose);
        sendForm(formMainCons, contMainCons);
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

        selSize.addEventListener('change', function() {
            sizeValue = +this.value;
            total = sizeValue + matValue + optValue;
            if (sizeValue == 0 || matValue == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        selMaterial.addEventListener('change', function() {
            matValue = +this.value;
            total = sizeValue + matValue + optValue;
            if (sizeValue == 0 || matValue == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        selOptions.addEventListener('change', function() {
            optValue = +this.value;
            total = sizeValue + matValue + optValue;
            if (sizeValue == 0 || matValue == 0) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        promoInput.addEventListener('input', function() {
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
                hoverImg(i, "5", "-1.png");
            });
            sizeBlocks[i].addEventListener('mouseout', () => {
                hoverImg(i, "0", ".png");
            });
        }

        function hoverImg(a, b, c) {
            img[a].setAttribute("src", "img/sizes-" + (a + 1) + c);
            img[a].style.zIndex = b;
        }
    }
    hoverPicture();

    // Slider Bottom 

    function sliderBottom() {
        let slideIndex = 0,
            slides = document.querySelectorAll('.feedback-slider-item'),
            slideInterval = setInterval(showSlides, 3000),
            feedbackDiv = document.querySelector('.feedback'),
            prev = document.querySelector('.main-prev-btn'),
            next = document.querySelector('.main-next-btn');

        showSlides(slideIndex);

        function showSlides(n) {
            if (n > slides.length - 1) {
                slideIndex = 0;
            }
            if (n < 0) {
                slideIndex = slides.length - 1;
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
            slideInterval = setInterval(showSlides, 3000);
        });
    }
    sliderBottom();

    // Accordion

    function acrdn() {
        let acrdn = document.getElementById('accordion'),
            acrdnHead = document.querySelectorAll('.accordion-heading'),
            acrdnBlock = document.querySelectorAll('.accordion-block');
            
        for (let i = 0; i < acrdnHead.length; i++) {
            acrdnHead[i].addEventListener('click', () => {
                acrdnBlock.forEach((item) => item.style.display = 'none');
                acrdnBlock[i].style.display = 'block';
                acrdnBlock[i].classList.add('animated');
                acrdnBlock[i].classList.add('fadeInDown');
                acrdnHead.forEach((item) => item.classList.remove('active'));
                acrdnHead[i].classList.add('active');
            });
        }
    }
    acrdn();
});