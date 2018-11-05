function acrdn() {
    let acrdnHead = document.querySelectorAll('.accordion-heading'),
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

export default acrdn;