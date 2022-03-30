let canvas = ''
let ctx = ''
let painting = false

function documentReady(init) {
    document.addEventListener("DOMContentLoaded", function (event) {
        console.log(event, 'event')
        init()
    });
}

function setCanvasParameters() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx = canvas.getContext('2d')
}

function init() {
    canvas = document.getElementById('canvas')
    setCanvasParameters();
    mouseDown();
    mouseUp();
    drawListener();
    clearButtonListener();
    colorPickerListener();
    rubberButtonListener();
    strokeButtonListener()
}

function startPosition() {
    painting = true
}

function endPosition() {
    painting = false
}

function mouseDown() {
    canvas.addEventListener('mousedown', () => {
        startPosition()
    })
}

function mouseUp() {
    canvas.addEventListener('mouseup', () => {
        endPosition()
        ctx.beginPath()
    })
}

function drawing(e) {
    if (!painting) return
    ctx.lineWidth = 12;
    ctx.lineCap = 'round'
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
}

// paint actions
function clearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function changeStrokeColor(color) {
    ctx.strokeStyle = color;
}

function rubber(e) {
    ctx.clearRect(e.clientX, e.clientY, 10, 10)
}

// listeners
function drawListener() {
    canvas.addEventListener('mousemove', drawing)
}

function rubberListener() {
    canvas.addEventListener('mousemove', rubber)
}

function removeMouseMoveListener(listener) {
    canvas.removeEventListener('mousemove', listener)
}

function clearButtonListener() {
    document.getElementById('clear').addEventListener('click', () => {
        clearAll()
    })
} // clear canvas
function colorPickerListener() {
    let picker = document.getElementById('colorPicker')
    picker.addEventListener('input', () => {
        changeStrokeColor(picker.value)
    })
} // change stroke color
function rubberButtonListener() {
    document.getElementById('rubber').addEventListener('click', () => {
        removeMouseMoveListener(drawing)
        rubberListener()
    })
} // init rubber
function strokeButtonListener() {
    document.getElementById('stroke').addEventListener('click', () => {
        removeMouseMoveListener(rubber)
        drawListener()
    })
} // init stroke

//call functions
documentReady(init)