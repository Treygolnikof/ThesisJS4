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

export default mask;