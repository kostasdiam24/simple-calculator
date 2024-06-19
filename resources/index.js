document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const keys = document.querySelector('.calculator__keys');
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let awaitingSecondValue = false;

    keys.addEventListener('click', event => {
        const { target } = event;
        const { action } = target.dataset;
        const keyContent = target.textContent;
        const displayedNum = display.textContent;

        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('key--number')) {
            if (displayedNum === '0' || awaitingSecondValue) {
                display.textContent = keyContent;
                awaitingSecondValue = false;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }

        if (target.classList.contains('key--decimal')) {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            }
            if (awaitingSecondValue) {
                display.textContent = '0.';
                awaitingSecondValue = false;
            }
        }

        if (target.classList.contains('key--operator')) {
            const currentValue = parseFloat(displayedNum);
            if (operator && awaitingSecondValue) {
                operator = action;
                return;
            }
            if (firstValue === null && !isNaN(currentValue)) {
                firstValue = currentValue;
            } else if (operator) {
                const result = calculate(firstValue, currentValue, operator);
                display.textContent = `${result}`;
                firstValue = result;
            }
            awaitingSecondValue = true;
            operator = action;
        }

        if (target.classList.contains('key--clear')) {
            display.textContent = '0';
            firstValue = null;
            operator = null;
            awaitingSecondValue = false;
        }

        if (target.classList.contains('key--equals')) {
            const currentValue = parseFloat(displayedNum);
            if (operator && !awaitingSecondValue) {
                display.textContent = calculate(firstValue, currentValue, operator);
                firstValue = null;
                operator = null;
                awaitingSecondValue = false;
            }
        }
    });

    function calculate(first, second, operator) {
        if (operator === 'add') return first + second;
        if (operator === 'subtract') return first - second;
        if (operator === 'multiply') return first * second;
        if (operator === 'divide') return first / second;
        return second;
    }
});
