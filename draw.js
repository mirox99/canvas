let canvas = ''
let canvasChanger = ''
let ctx = ''
let destCtx = ''
let isMouseDown = false
let activeColor = 'black'
let elp = null
let activeListener = 'draw'

function documentReady(init) {
    document.addEventListener("DOMContentLoaded", function (event) {
        console.log(event, 'event')
        init()
    });
}

function setCanvasParameters() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvasChanger.width = window.innerWidth
    canvasChanger.height = window.innerHeight
    ctx = canvasChanger.getContext('2d')
    destCtx = canvas.getContext('2d')
}

function init() {
    canvas = document.getElementById('canvas')
    canvasChanger = document.getElementById('canvas_changer')
    setCanvasParameters();
    mouseDown();
    mouseUp();
    drawListener()
    clearButtonListener();
    colorPickerListener();
    rubberButtonListener();
    strokeButtonListener();
    fillButtonListener();
    circlesButtonListener();
    ellipseButtonListener();
    textButtonListener();
    keyUpListener()
}

function startPosition(e) {
    isMouseDown = true
    console.log(e)
    // elp = new Ellipse(e.clientX, e.clientY, 0, 0);
    // elp.create();
}

function endPosition() {
    isMouseDown = false
}

function mouseDown() {
    canvasChanger.addEventListener('mousedown', (e) => {
        startPosition(e);
        if (activeListener === 'ellipse') {
            elp = new Ellipse(e.clientX, e.clientY, 0, 0);
            elp.create();
        }
    })
}

function mouseUp() {
    canvasChanger.addEventListener('mouseup', () => {
        endPosition()
        ctx.beginPath();
        destCtx.drawImage(canvasChanger, 0, 0);
        clearAll();
    })
}

function drawing(e) {
    if (!isMouseDown) return
    ctx.lineWidth = 12;
    ctx.lineCap = 'round'
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
}

function Ellipse(x, y, rx, ry) {
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;

    this.create = () => {
        if (!isMouseDown) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.lineWidth = 1;
        ctx.fillStyle = activeColor;
        ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
    this.animate = (e) => {
        this.rx = e.clientX - this.x < 0 ? -(e.clientX - this.x) : e.clientX - this.x
        this.ry = e.clientY - this.y < 0 ? -(e.clientY - this.y) : e.clientY - this.y
        this.create()
    }
}

// paint actions
function clearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function changeStrokeColor() {
    ctx.strokeStyle = activeColor;
}

function rubber(e) {
    if (!isMouseDown) return
    ctx.clearRect(e.clientX, e.clientY, 10, 10)
    destCtx.clearRect(e.clientX, e.clientY, 10, 10)
}

function fillCanvas() {
    ctx.fillStyle = activeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(e) {
    if (!isMouseDown) return
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.fillStyle = activeColor;
    ctx.ellipse(e.clientX, e.clientY, 40, 40, 0, 0, Math.PI * 2);
    ctx.stroke();
}

function drawEllipse(e) {
    elp.animate(e)
}

function drawText(e) {
    console.log(e)
    ctx.font = "30px Arial";
    ctx.fillText(e.key, 300, 50);
}
function setTextCursor(e){
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.lineTo(e.clientX, e.clientY + 30);
    ctx.stroke();
}

// listeners
function drawListener() {
    canvasChanger.addEventListener('mousemove', drawing)
}

function rubberListener() {
    canvasChanger.addEventListener('mousemove', rubber)
}

function removeListeners() {
    activeListener = ''
    canvasChanger.removeEventListener('mousemove', drawing)
    canvasChanger.removeEventListener('mousemove', rubber)
    canvasChanger.removeEventListener('mousemove', drawCircle)
    canvasChanger.removeEventListener('mousemove', drawEllipse)
    canvasChanger.removeEventListener('click', fillCanvas)
}

function fillCanvasListener() {
    canvasChanger.addEventListener('click', fillCanvas)
}

function circlesListener() {
    canvasChanger.addEventListener('mousemove', drawCircle)
}

function ellipseListener() {
    activeListener = 'ellipse'
    canvasChanger.addEventListener('mousemove', drawEllipse)
}

function textListener() {
    activeListener = 'text'
    canvasChanger.addEventListener('click', setTextCursor)
}

function keyUpListener() {
    window.addEventListener('keyup', (e) => {
        drawText(e)
    })
}

function clearButtonListener() {
    document.getElementById('clear').addEventListener('click', () => {
        clearAll();
        destCtx.clearRect(0, 0, canvas.width, canvas.height)
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
function circlesButtonListener() {
    document.getElementById('circle').addEventListener('click', () => {
        removeListeners()
        circlesListener()
    })
} // init fill
function ellipseButtonListener() {
    document.getElementById('ellipse').addEventListener('click', () => {
        removeListeners()
        ellipseListener()
    })
} // init fill
function textButtonListener() {
    document.getElementById('text').addEventListener('click', () => {
        removeListeners()
        textListener()
    })
} // init fill

//call functions
documentReady(init)