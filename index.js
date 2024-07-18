const $calculator = document.querySelector('.form')
const $controls = $calculator.querySelector('.form-controls')

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const operators = ['+', '-', '*', '/', '%']
const controls = ['CE', 'C', '=']

let $buttonNumber = ''
let $buttonOperators = ''
let $buttonControls = ''

numbers.forEach((number) => {
    $buttonNumber += '<button class="form-number" >' + number + '</button>'
})

operators.forEach((operator) => {
    $buttonOperators += '<button class="form-operator" >' + operator + '</button>'
})

controls.forEach((control) => {
    $buttonControls += '<button class="form-control">' + control + '</button>'
})

$controls.insertAdjacentHTML('beforeend', $buttonNumber)
$controls.insertAdjacentHTML('beforeend', $buttonOperators)
$controls.insertAdjacentHTML('beforeend', $buttonControls)

const $buttons = $calculator.querySelectorAll('button')
const $display = $calculator.querySelector('.form-display')
const $expresion = $display.querySelector('.display-expresion')
const $currentValue = $display.querySelector('.display-value')
let digit = '0'

$buttons.forEach(($button) => {

    $button.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.classList == 'form-number') {
            digit = $currentValue.value + e.target.textContent
            handleChangeInput(digit)
        }

        if (e.target.classList == 'form-operator') {
            $currentValue.value += e.target.textContent
            handleOperator($currentValue.value)
        }

        if (e.target.textContent == 'CE') {
            handleClearClick()
            digit = ''
        }

        if (e.target.textContent == 'C') {
            handleRemoveClick()
        }

        if (e.target.textContent == '=') {
            digit = $currentValue.value
            const expresion = $expresion.textContent.replace('=','') + digit;
            handleResolveClick(expresion)
        }
    })
})

function handleChangeInput(number) {
    $currentValue.value = number
    insertFormatValue($currentValue.value)
}

function handleOperator(expression) {
    const operator = expression.slice(-1)
    const currentNumber = expression.slice(0, -1)

    if ($expresion.textContent.includes('=')) {
        $expresion.textContent = currentNumber + operator
    } else {
        $expresion.textContent += currentNumber + operator
        //$expresion.insertAdjacentHTML('beforeend','<x-number>'+'ok'+'</x-number>')
    }
    $currentValue.value = ''
}

function handleClearClick() {
    $expresion.textContent = ''
    $currentValue.value = '0'
}

function handleRemoveClick() {
    if ($currentValue.value !== '0') {
        $currentValue.value = $currentValue.value.slice(0, -1)
    }
    if ($currentValue.value === '') {
        $currentValue.value = 0
    }
}

function handleResolveClick(expression) {
    try {
        const hasOperator = operators.some(operator => $expresion.textContent.includes(operator))
        
        if (!hasOperator) {
            const operationBasica = '0+'+$currentValue.value
            console.log('basic',$currentValue.value)
            $currentValue.value = eval(operationBasica)
            $expresion.textContent = $currentValue.value + '='
        } else {
            $currentValue.value = eval(expression)
            $expresion.textContent = expression + '='
        }
        
    } catch (error) {
        $currentValue.value = 'SINTAXIS ERROR'
    }
}

$currentValue.addEventListener('input', (e) => {
    handleChangeInput(e.target.value)

    if (e.target.value.includes('=')) {
        const expresion = $expresion.textContent  + $currentValue.value.slice(0, -1)
        e.target.value = $currentValue.value.slice(0, -1)
        console.log('val',expresion,' ex', $currentValue.value)
        handleResolveClick(expresion)
    }
})

function insertFormatValue(value) {
    const hasOperator = operators.some(operator => value.includes(operator))
    if (hasOperator) {
        handleOperator(value)
    }

    if (!value.includes('.') && !hasOperator && !value.includes('=')) {
        const formatedDigit = + value
        $currentValue.value = formatedDigit
    }
}


