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

export default forms;