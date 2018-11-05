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
    
    function optionCalc() {
        total = sizeValue + matValue + optValue;
        if (sizeValue == 0 || matValue == 0) {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    }

    selSize.addEventListener('change', function() {
        sizeValue = +this.value;
        optionCalc();
    });

    selMaterial.addEventListener('change', function() {
        matValue = +this.value;
        optionCalc();
    });

    selOptions.addEventListener('change', function() {
        optValue = +this.value;
        optionCalc();
    });

    promoInput.addEventListener('input', function() {
        if (promoInput.value != "IWANTPOPART" && sizeValue != 0 && matValue != 0) {
            totalValue.innerHTML = total;
        } else {
            totalValue.innerHTML = total * 0.7;
        }
        
    });
}

export default calc;