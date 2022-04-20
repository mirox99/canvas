let canvas = ''
let ctx = ''
let width = window.innerWidth
let height = window.innerHeight
let ballsNumber = 200
let colors = ['#ffffff', '#00ff5b', '#ffffff', '#FFFF99', '#00B3E6',
    '#ffeca1', '#97b3ff', '#999966', '#5d5b5b', '#B34D4D',
    '#f8ff7f', '#eeffa7', '#E6B3B3', '#ffdea8', '#66991A',
];
let rotate = 0;
let speed = 0.0009
let scaleDirection = 0.0001
let scale = 1
let balls = []

function documentReady(init) {
    document.addEventListener("DOMContentLoaded", function (event) {
        init()
    });
}

function init() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    balls = CreateBalls()
    animation()
}

function Circle(x, y, r, c, i) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.id = i


    this.draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.c;
        ctx.shadowColor = this.c;
        ctx.shadowBlur = 10;
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2);
        ctx.fill()
    }

    this.animate = () => {
        this.draw()
    }
}

function CreateBalls() {
    let balls = []
    for (let i = 0; i < ballsNumber; i++) {
        let r = Math.floor(Math.random() * 2) + 1
        let x = Math.random() * (canvas.width - 2 * r) + r - width / 2
        let y = Math.random() * (canvas.height - 2 * r) + r - height / 2
        let c = colors[Math.floor(Math.random() * 15 + 1)];

        balls.push(new Circle(x, y, r, c, i))
    }
    return balls
}

function animation() {
    ctx.fillStyle = `rgba(0, 0, 0, .5)`;
    ctx.fillRect(0, 0, width, height)
    ctx.save()
    ctx.translate(width / 2, height / 2)
    ctx.rotate(rotate);
    ctx.scale(scale, scale)
    balls.forEach(item => {
        item.draw()
    })
    ctx.restore();
    requestAnimationFrame(animation)
    rotate += speed
    scale += scaleDirection * 0.3
    if (scale > 1.5) scaleDirection = -scaleDirection
    if (scale < 1) scaleDirection = -scaleDirection
}

// start
documentReady(init)