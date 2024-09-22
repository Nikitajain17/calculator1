const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let previousInput = '';
let operator = null;

keys.addEventListener('click', function(event) {
    const target = event.target;
    const value = target.value;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'all-clear':
            clear();
            break;
        case '.':
            if (!currentInput.includes('.')) {
                currentInput += value;
            }
            updateScreen(currentInput);
            break;
        default:
            handleNumber(value);
            break;
    }
});

function handleNumber(value) {
    if (currentInput.length < 10) {
        currentInput += value;
        updateScreen(currentInput);
    }
}

function handleOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = '';
    operator = op;
}

function calculate() {
    let result;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(previous) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            result = previous / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateScreen(currentInput);
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateScreen(currentInput);
}

function updateScreen(value) {
    screen.value = value;
}

