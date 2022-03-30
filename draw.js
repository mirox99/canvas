let canvas = ''
let ctx = ''
let painting = false
let activeColor = 'black'

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
    strokeButtonListener();
    fillButtonListener();
    ellipseButtonListener()
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

function changeStrokeColor() {
    ctx.strokeStyle = activeColor;
}

function rubber(e) {
    if (!painting) return
    ctx.clearRect(e.clientX, e.clientY, 10, 10)
}

function fillCanvas() {
    ctx.fillStyle = activeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawEllipse(e) {
    if (!painting) return
    console.log('tet')
    ctx.beginPath()
    ctx.fillStyle = activeColor;
    ctx.ellipse(e.clientX, e.clientY, 40, 40, 0, 0, Math.PI * 2);
    ctx.stroke();
}

// listeners
function drawListener() {
    canvas.addEventListener('mousemove', drawing)
}

function rubberListener() {
    canvas.addEventListener('mousemove', rubber)
}

function removeListeners() {
    canvas.removeEventListener('mousemove', drawing)
    canvas.removeEventListener('mousemove', rubber)
    canvas.removeEventListener('click', fillCanvas)
}

function fillCanvasListener() {
    canvas.addEventListener('click', fillCanvas)
}

function ellipseListener() {
    canvas.addEventListener('mousemove', drawEllipse)
}

function clearButtonListener() {
    document.getElementById('clear').addEventListener('click', () => {
        clearAll()
    })
} // clear canvas
function colorPickerListener() {
    let picker = document.getElementById('colorPicker')
    picker.addEventListener('input', () => {
        activeColor = picker.value
        changeStrokeColor()
    })
} // change stroke color
function rubberButtonListener() {
    document.getElementById('rubber').addEventListener('click', () => {
        removeListeners()
        rubberListener()
    })
} // init rubber
function strokeButtonListener() {
    document.getElementById('stroke').addEventListener('click', () => {
        removeListeners()
        drawListener()
    })
} // init stroke
function fillButtonListener() {
    document.getElementById('fill').addEventListener('click', () => {
        removeListeners()
        fillCanvasListener()
    })
} // init fill
function ellipseButtonListener() {
    document.getElementById('ellipse').addEventListener('click', () => {
        removeListeners()
        ellipseListener()
    })
} // init fill

//call functions
documentReady(init)