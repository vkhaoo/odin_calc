//Footer Refences

const img = document.querySelectorAll('#img')

function imgHover(pressed) {
    const target = pressed.currentTarget.classList.toggle('hoverImg')
}

img.forEach(pressed => {
    pressed.addEventListener('mouseenter', imgHover)
    pressed.addEventListener('mouseout', imgHover)
})

//Actual Calculator Logics

//Declare everything you need

const btn = document.querySelectorAll('.btn')
const display = document.querySelector('#calcDisplay')

let param0 = ''
let operator = ''
let param1 = ''
let resultDisplayed = false

const numberMap = {
    'seven':'7',
    'eight':'8',
    'nine':'9',
    'four':'4',
    'five':'5',
    'six':'6',
    'one':'1',
    'two':'2',
    'three':'3',
    'zero':'0'
}

const mathObj = {
    'add': function(param0, param1) {return parseFloat(param0)+parseFloat(param1)},
    'subtract': function(param0, param1) {return param0-param1},
    'multiply': function(param0, param1) {return param0*param1},
    'divide': function(param0, param1) {return param0/param1}
}

//Declare checking functions

function checkOperator(targetId) {
    for (let name in mathObj) {
        if (name === targetId) {
            return true
        }
    }
    return false
}

function isNumber(targetId) {
    for (let name in numberMap) {
        if (name === targetId) {
            return true
        }
    }
    return false
}

function check(targetId) {
    if (operator === '' && isNumber(targetId) && !resultDisplayed) {
        return 'param0'
    }
    else if (operator != '' && isNumber(targetId) && !resultDisplayed) {
        return 'param1'
    }
    else if (isNumber(targetId) && resultDisplayed) {
        return 'newDigit'
    }
    else if (checkOperator(targetId) && param0 != '' && param1 === '') {
        return 'operator'
    }
    else if(checkOperator(targetId) && param1 != '') {
        return 'concatenateOperation'
    }
    else if (targetId === 'equal') {
        return 'equal'
    }
    else if (targetId === 'reset') {
        return 'reset'
    }
}

//Functions for p0,p1 and operator management

function addParam0(targetId) {
    let add = numberMap[targetId]
    param0 += add
    display.textContent = `${param0} ${operator} ${param1}`
}

function addParam1(targetId) {
    let add = numberMap[targetId]
    param1 += add
    display.textContent = `${param0} ${operator} ${param1}`
}

function addOperator(targetId) {
    operator = targetId
    if (resultDisplayed) {
        param0 = display.textContent
        param1 = ''
        resultDisplayed = false
    }
    display.textContent = `${param0} ${operator} ${param1}`
}

function concatenateOp(targetId) {
    if (param1 === '0' && operator === 'divide') {
        display.textContent = 'Impossible output'
        param0 = ''
        param1 = ''
        operator = ''
        return
    }
    param0 = String(mathObj[operator](param0, param1))
    param1 = ''
    operator = targetId
    display.textContent = `${param0} ${operator} ${param1}`
}

//Functions to manage equal|reset buttons

function equalPressed(targetId) {
    if (param1 === '0' && operator === 'divide') {
        display.textContent = 'Impossible output'
        param0 = ''
        param1 = ''
        operator = ''
    }
    else if (param1 != '') {
        display.textContent = String(mathObj[operator](param0, param1))
        resultDisplayed = true
    }
    else {display.textContent = 'something went wrong.'}
}

function resetPressed(targetId) {
    param0 = '' 
    operator = ''
    param1 = ''
    display.textContent = `${param0} ${operator} ${param1}`
}

//Main logic function

function inputManager(targetId) {

    const returnedValue = check(targetId)

    if (returnedValue === 'param0') {
        addParam0(targetId)
    }
    else if (returnedValue === 'operator') {
        addOperator(targetId)
    }
    else if (returnedValue === 'concatenateOperation') {
        concatenateOp(targetId)
    }
    else if (returnedValue === 'param1') {
        addParam1(targetId)
    }
    else if (returnedValue === 'equal') {
        equalPressed(targetId)
    }
    else if (returnedValue === 'reset') {
        resetPressed(targetId)
    }
    else if (returnedValue === 'newDigit') {
        param0 = ''
        param1 = ''
        operator = ''
        resultDisplayed = false
        addParam0(targetId)
    }
}

//Buttons function with event listener

function btnPressed(event) {
    let targetId = event.currentTarget.id
    inputManager(targetId)
    console.log(param0, operator, param1)
}

btn.forEach(event => {
    event.addEventListener('click', btnPressed)
})