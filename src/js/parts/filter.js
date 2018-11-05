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

export default filterBlock;