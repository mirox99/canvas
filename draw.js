let canvas = ''
let canvasChanger = ''
let ctx = ''
let destCtx = ''
let isMouseDown = false
let activeColor = 'black'
let elp = null
let activeListener = 'draw'
let cropperInner = ''

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
    cropButtonListener();
}

function startPosition(e) {
    isMouseDown = true
    console.log(e)
    // elp = new Ellipse(e.clientX, e.clientY, 0, 0);
    // elp.create();
}

function endPosition() {
    console.log('end position')
    isMouseDown = false
}

function mouseDown() {
    canvasChanger.addEventListener('mousedown', (e) => {
        startPosition(e);
        if (activeListener === 'ellipse') {
            elp = new Ellipse(e.clientX, e.clientY, 0, 0);
            elp.create();
        }
        if (activeListener === 'crop') {
            if (cropperInner) {
                cropperInner.destroy()
                return
            }
            cropperInner = new CropCanvas(e.clientX, e.clientY);
            cropperInner.create()
        }
    })
}

function mouseUp() {
    canvasChanger.addEventListener('mouseup', () => {
        console.log('mouse-upp  listener')
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

function CropCanvas(x, y) {
    this.x = x;
    this.y = y;
    let inner = document.getElementById('cropperInner');
    let canvasCropper = document.getElementById('cropper')
    let cropCtc = canvasCropper.getContext('2d')
    this.create = () => {
        inner.style.left = this.x + 'px'
        inner.style.top = this.y + 'px'
    }
    this.animate = (e) => {
        inner.style.width = e.clientX - this.x + 'px'
        inner.style.height = e.clientY - this.y + 'px'
        canvasCropper.width = e.clientX - this.x
        canvasCropper.height = e.clientY - this.y
        cropCtc.drawImage(canvas, e.clientX, e.clientY, e.clientX - this.x, e.clientY - this.y,  0, 0, e.clientX - this.x, e.clientY - this.y,);
    }
    this.destroy = () => {
        cropperInner = null
        inner.style.left = 0;
        inner.style.top = 0;
        inner.style.width = 0
        inner.style.height = 0
        canvasCropper.width = 0
        canvasCropper.height = 0
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

function cropCanvas(e) {
    if (!isMouseDown) return;
    cropperInner.animate(e)
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
    canvasChanger.removeEventListener('mousemove', cropCanvas)
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

function cropListener() {
    activeListener = 'crop'
    canvasChanger.addEventListener('mousemove', cropCanvas)
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
function cropButtonListener() {
    document.getElementById('crop').addEventListener('click', () => {
        removeListeners()
        cropListener()
    })
} // init fill

//call functions
documentReady(init)