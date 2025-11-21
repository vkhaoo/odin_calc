//Footer Refences

const img = document.querySelectorAll('#img')

function imgHover(pressed) {
    const target = pressed.currentTarget.classList.toggle('hoverImg')
}

img.forEach(pressed => {
    pressed.addEventListener('mouseenter', imgHover)
})

img.forEach(pressed => {
    pressed.addEventListener('mouseout', imgHover)
})

//Calculator

const btn = document.querySelectorAll('.btn')

let inputObj = {
    'param0':'',
    'operator':'',
    'param1':''
}

let param0 = inputObj.param0

const mathObj = {
    'add': function(param0, param1) {return param0+param1},
    'subtract': function(param0, param1) {return param0-param1},
    'multiply': function(param0, param1) {return param0*param1},
    'divide': function(param0, param1) {return param0/param1}
}

const btnObj = {
    'openP':'(',
    'closeP':')',
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

function btnPressed(event) {
    const targetId = event.currentTarget.id
    if (inputObj.param0 === '') {
        const add = btnObj[targetId]
        param0 += add
    }
    console.log(param0)
}

btn.forEach(event => {
    event.addEventListener('click', btnPressed)
})