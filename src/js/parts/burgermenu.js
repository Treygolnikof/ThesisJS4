function burgerMenu() {
    let burgerMenu = document.querySelector('.burger-menu'),
        burgerBtn = document.querySelector('.burger'),
        checkInterval = setInterval(widthBrowser, 500);

    function widthBrowser() {
        let check = false;
        if (window.screen.availWidth < 768) {
            burgerBtn.addEventListener('click', () => {
                if (check == false) {
                    burgerMenu.style.display = 'block';
                    check = true;
                } else {
                    burgerMenu.style.display = 'none';
                    check = false;
                }
            });
        } else {
            burgerMenu.style.display = 'none';
            check = false;
        }
    }       
}

export default burgerMenu;