let canvas = ''
let ctx = ''
let balls = []
let ballsNumber = 20

function documentReady(init) {
    document.addEventListener("DOMContentLoaded", function (event) {
        console.log(event, 'event')
        init()
    });
}

function init() {
    canvas = document.getElementById('canvas')
    setCanvasParameters();
    balls = CreateBalls()
    animateBalls()
    canvasClickEvent()
}

function setCanvasParameters() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx = canvas.getContext('2d')
}

function Circle(x, y, r, c, i) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.id = i
    this.dx = (Math.random() * 4) + 1;
    this.dx *= this.dx < 2 ? -1 : 1
    this.dy = (Math.random() * 4) + 1;
    this.dy *= this.dy < 2 ? -1 : 1
    this.timeOut = null
    this.draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
    }

    this.animate = () => {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy
        }
        this.draw()
    }
    this.jump = () => {
        if (this.timeOut) clearTimeout(this.timeOut)
        console.log(this.dx, this.dy)
        this.dx = this.dx < 0 ? this.dx - 4 : this.dx + 4
        this.dy = this.dy < 0 ? this.dy - 4 : this.dy + 4
        this.timeOut = setTimeout(() => {
            this.dx = this.dx < 0 ? this.dx + 4 : this.dx - 4
            this.dy = this.dy < 0 ? this.dy + 4 : this.dy - 4
        }, 700)
    }
}

function CreateBalls() {
    let balls = []
    for (let i = 0; i < ballsNumber; i++) {
        let r = Math.floor(Math.random() * 30) + 20
        let x = Math.random() * (canvas.width - 2 * r) + r
        let y = Math.random() * (canvas.height - 2 * r) + r
        let c = 'green';
        balls.push(new Circle(x, y, r, c, i))
    }
    return balls
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function animateBalls() {
    clearCanvas()
    balls.forEach(item => {
        item.animate()
    })
    requestAnimationFrame(animateBalls)
}

function canvasClickEvent() {
    canvas.addEventListener('click', e => {
        balls.forEach(item => {
            if (e.clientX > item.x - item.r && e.clientX < item.x + item.r) {
                item.jump()
            }
        })
        // let r = Math.floor(Math.random() * 30) + 20;
        // balls.push(new Circle(e.clientX, e.clientY, r, 'blue'))
    })
}

//run functions

documentReady(init)