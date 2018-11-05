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

export default modals;