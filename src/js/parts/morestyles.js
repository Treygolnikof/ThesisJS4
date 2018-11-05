function openMoreStyles() {
    let stylesBtn = document.querySelector('.button-styles'),
        moreStyles = document.querySelectorAll('.styles-2');

    stylesBtn.addEventListener('click', () => {
        moreStyles.forEach((item) => item.style.display = 'block');
    })
}

export default openMoreStyles;