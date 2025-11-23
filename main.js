//Footer Refences

const img = document.querySelectorAll('#img')

function imgHover(pressed) {
    const target = pressed.currentTarget.classList.toggle('hoverImg')
}

img.forEach(pressed => {
    pressed.addEventListener('mouseenter', imgHover)
    pressed.addEventListener('mouseout', imgHover)
})

//Calculator

const btn = document.querySelectorAll('.btn')
const display = document.querySelector('#calcDisplay')

let inputObj = {
    'param0':'',
    'operator':'',
    'param1':''
}

let param0 = inputObj.param0
let operator = inputObj.operator
let param1 = inputObj.param1 

const mathObj = {
    'add': function(param0, param1) {return parseFloat(param0)+parseFloat(param1)},
    'subtract': function(param0, param1) {return param0-param1},
    'multiply': function(param0, param1) {return param0*param1},
    'divide': function(param0, param1) {return param0/param1}
}

const btnObj = {
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

function inputManager(targetId) {
    console.log(targetId)
    if (check(targetId) === 'param0') {
        addParam0(targetId)
    }
    else if (check(targetId) === 'operator') {
        addOperator(targetId)
    }
    else if (check(targetId) === 'param1') {
        addParam1(targetId)
    }
    else if (check(targetId) === 'equal') {
        equalPressed(targetId)
    }
    else if (check(targetId) === 'reset') {
        resetPressed(targetId)
    }
}

function isNumber(targetId) {
    for (let name in btnObj) {
        if (name === targetId) {
            return true
        }
        else continue
    }
    return false
}

function check(targetId) {
    if (operator === '' && isNumber(targetId)) {
        return 'param0'
    }
    else if (operator != '' && isNumber(targetId)) {
        return 'param1'
    }
    else if (checkOperator(targetId) && param0 != '') {
        return 'operator'
    }
    else if (targetId === 'equal') {
        return 'equal'
    }
    else if (targetId === 'reset') {
        return 'reset'
    }
}

function addParam0(targetId) {
    let add = btnObj[targetId]
    param0 += add
    display.textContent = `${param0} ${operator} ${param1}`
}

function checkOperator(targetId) {
    for (let name in mathObj) {
        if (name === targetId) {
            return true
        }
        else continue
    }
    return false
}

function addOperator(targetId) {
    operator = targetId
    param1 = ''
    display.textContent = `${param0} ${operator} ${param1}`
}

function addParam1(targetId) {
    let add = btnObj[targetId]
    param1 += add
    display.textContent = `${param0} ${operator} ${param1}`
}

function equalPressed(targetId) {
    if (param1 != '') {
        display.textContent = String(mathObj[operator](param0, param1))
        param0 = parseFloat(display.textContent)
    }
    else {display.textContent = 'something went wrong.'}
}

function resetPressed(targetId) {
    param0 = '' 
    operator = ''
    param1 = ''
    display.textContent = `${param0} ${operator} ${param1}`
}

function btnPressed(event) {
    let targetId = event.currentTarget.id
    checkOperator(targetId)
    inputManager(targetId)
    console.log(param0, operator, param1)
}

btn.forEach(event => {
    event.addEventListener('click', btnPressed)
})