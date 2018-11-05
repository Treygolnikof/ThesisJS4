function acrdn() {
    let acrdnHead = document.querySelectorAll('.accordion-heading'),
        acrdnBlock = document.querySelectorAll('.accordion-block');
        
    for (let i = 0; i < acrdnHead.length; i++) {
        let check = false;
        acrdnHead[i].addEventListener('click', () => {
            if (!check) {
                acrdnBlock.forEach((item) => item.style.display = 'none');
                acrdnBlock[i].style.display = 'block';
                acrdnBlock[i].classList.add('animated');
                acrdnBlock[i].classList.add('fadeInDown');
                acrdnHead.forEach((item) => item.classList.remove('active'));
                acrdnHead[i].classList.add('active');
                check = true;
            } else {
                acrdnBlock[i].style.display = 'none';
                acrdnHead[i].classList.remove('active');
                check = false;
            }
        });
    }
}

export default acrdn;