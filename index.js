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
let expression = ''

$buttons.forEach(($button) => {

    $button.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.classList.contains('form-number')) {
            digit = $currentValue.value + e.target.textContent
            handleChangeInput(digit)
        }

        if (e.target.classList.contains('form-operator')) {
            digit = $currentValue.value
            const operator = e.target.textContent
            const currentValue = digit
            expression += currentValue + operator
            handleOperator({ currentValue, operator })
        }

        if (e.target.textContent == 'CE') {
            handleClearClick()
            digit = ''
            expression = ''
        }

        if (e.target.textContent == 'C') {
            handleRemoveClick()
        }

        if (e.target.textContent == '=') {
            if(document.querySelector('.expresion-equal')) return
            expression += $currentValue.value
            const currentValue = $currentValue.value
            $expresion.insertAdjacentHTML(
                'beforeend', 
                `<span>${currentValue}</span>
                <span class='expresion-equal'> = </span>`
            )
            $currentValue.value = handleResolveClick(expression)
            expression = ''
        }


    })
})

function handleChangeInput(number) {
    $currentValue.value = number
    
    const hasOperator = operators.some(operator => number.includes(operator))
    const hasEqual = $currentValue.value.includes('=')
    const isDecimal = $currentValue.value.includes('.')

    if (hasOperator && !hasEqual) {
        const operator = number.slice(-1)
        const currentValue = number.slice(0, -1)
        $currentValue.value = currentValue
        expression += currentValue + operator
        handleOperator({ currentValue, operator })
    }

    if (!isDecimal && !hasEqual) {
        const formatedDigit = + $currentValue.value
        $currentValue.value = formatedDigit
    }

    if(hasEqual){
        $currentValue.value = number.slice(0, -1)

        if(document.querySelector('.expresion-equal')) return
        
        expression += $currentValue.value
        $expresion.insertAdjacentHTML(
            'beforeend', 
            `<span>${$currentValue.value}</span>
            <span class='expresion-equal'> = </span>`
        )
        $currentValue.value = handleResolveClick(expression)
        expression = ''
    }
}

function handleOperator({ currentValue, operator }) {
    if(document.querySelector('.expresion-equal')){
        $expresion.textContent = ''
        $expresion.insertAdjacentHTML(
            'beforeend',
            `<span>${$currentValue.value}</span>
            <span>${operator}</span>`
        )
        $currentValue.value = 0
    }else{
        $expresion.insertAdjacentHTML(
            'beforeend',
            `<span>${currentValue}</span>
            <span>${operator}</span>`
        )
        $currentValue.value = 0
    }
}

function handleClearClick() {
    $expresion.textContent = ''
    $currentValue.value = 0
}

function handleRemoveClick() {
    if ($currentValue.value !== '0') {
        $currentValue.value = $currentValue.value.slice(0, -1)
    }
    if ($currentValue.value === '') {
        $currentValue.value = 0
    }
}

function handleResolveClick(equation) {
    try {
        return eval(equation)
    } catch (error) {
        return 'SINTAXIS ERROR'
    }
}

$currentValue.addEventListener('input', (e) => {
    handleChangeInput(e.target.value)
})



