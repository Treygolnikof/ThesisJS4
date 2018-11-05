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

export default hoverPicture;