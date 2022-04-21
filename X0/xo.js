//variables
let canvas = ''
let ctx = ''
let width = window.innerWidth
let height = window.innerHeight
let boxSize = 300
let startX = (width - boxSize) / 2
let endX = (width + boxSize) / 2
let startY = (height - boxSize) / 2
let endY = (height + boxSize) / 2
let turn = 0
let matrix = [[], [], []]
let playerOne = {
    name: 'x',
    id: 0
}
let playerTwo = {
    name: 'O',
    id: 1
}
let winner = null

//methods

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

    drawBox()
    clickListener()
}

function drawBox() {
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, startY)
    ctx.strokeStyle = 'rgb(47,1,1)'
    ctx.lineWidth = 8
    ctx.lineCap = 'round';
    ctx.stroke()
    //left
    ctx.moveTo(endX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    //down
    ctx.moveTo(endX, endY)
    ctx.lineTo(startX, endY)
    ctx.stroke()
    //right
    ctx.moveTo(startX, endY)
    ctx.lineTo(startX, startY)
    ctx.stroke()

    //matrix horizontal
    for (let i = 1; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(startX, startY + i * boxSize / 3)
        ctx.lineTo(endX, startY + i * boxSize / 3)
        ctx.stroke()
    }
    //matrix vertical
    for (let i = 1; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(startX + i * boxSize / 3, startY)
        ctx.lineTo(startX + i * boxSize / 3, endY)
        ctx.stroke()
    }
}

function drawX(x, y) {
    ctx.strokeStyle = 'rgb(0,3,255)'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(x - 10, y - 10)
    ctx.lineTo(x + 10, y + 10)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x + 10, y - 10)
    ctx.lineTo(x - 10, y + 10)
    ctx.stroke()
}

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgb(101,255,0)'
    ctx.ellipse(x, y, 15, 15, 0, 0, Math.PI * 2);
    ctx.stroke();
}

function checkWinner() {
    let hor = -1
    let ver = -1
    for (let i = 0; i < 3; i++) {
        let checkHor = matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i] && matrix[0][i] !== undefined
        let checkVer = matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2] && matrix[i][0] !== undefined
        if (checkHor) hor = matrix[0][i]
        if (checkVer) ver = matrix[i][0]
    }
    if (hor > -1) return hor
    if (ver > -1) return ver

    //diagonal check
    let dia1 = matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]
    let dia2 = matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0]
    if (dia1 || dia2) return matrix[1][1]
    //draw check
    if (turn === 8) return 'draw'
}

function showWinner() {
    let title = document.getElementById('winner');

    if (typeof winner === "string") {
        title.innerHTML = `The game end draw`;
        return
    }
    let win = winner === playerOne.id ? playerOne : playerTwo
    title.innerHTML = `The Winner is ${win.name}`
    canvas.style.pointerEvents = 'none'
    celebrate();
    playWiningSound()
    setTimeout(() => {
        restartGame()
    }, 4000)
}

function playWiningSound() {
    let x = document.getElementById("myAudio");

    x.play();
}

function fireClickSound() {
    let x = document.getElementById("click_audio");
    x.play();
}

function failsSound() {
    let x = document.getElementById("fail");
    x.play();
}

function restartGame() {
    winner = null
    matrix = [[], [], []]
    turn = 0
    ctx.clearRect(0, 0, winner, height)
    canvas.style.pointerEvents = 'auto'
    document.getElementById('winner').innerHTML = ``
    init()
}

function clickEvent(e) {
    if (e.clientX < startX || e.clientX > endX || e.clientY < startY || e.clientY > endY) {
        failsSound()
        return
    }
    let xi = Math.floor((e.clientX - startX) / 100)
    let yi = Math.floor((e.clientY - startY) / 100)
    if (typeof matrix[xi][yi] === 'number') return;
    let drawStartX = startX + xi * 100 + 50
    let drawStartY = startY + yi * 100 + 50
    fireClickSound()

    if (turn % 2 === 0) {
        drawX(drawStartX, drawStartY)
        matrix[xi][yi] = playerOne.id
    } else {
        drawCircle(drawStartX, drawStartY)
        matrix[xi][yi] = playerTwo.id
    }
    winner = checkWinner()
    if (typeof winner === "number" || typeof winner === "string") {
        showWinner()
    }
    turn++
}

//event listener
function clickListener() {
    canvas.addEventListener('click', clickEvent)
}

//run
documentReady(init)

////celebration

const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;

// canvas settings
let viewWidth = innerWidth,
    viewHeight = innerHeight,
    drawingCanvas = document.getElementById("celebrate_canvas"),
    ctxCel,
    timeStep = (1 / 60);

Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Particle = function (p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = '#' + Math.floor((Math.random() * 0xffffff)).toString(16);

    this.w = 8;
    this.h = 6;

    this.complete = false;
};

Particle.prototype = {
    update: function () {
        this.time = Math.min(this.duration, this.time + timeStep);

        var f = Ease.outCubic(this.time, 0, 1, this.duration);
        var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

        var dx = p.x - this.x;
        var dy = p.y - this.y;

        this.r = Math.atan2(dy, dx) + HALF_PI;
        this.sy = Math.sin(Math.PI * f * 10);
        this.x = p.x;
        this.y = p.y;

        this.complete = this.time === this.duration;
    },
    draw: function () {
        ctxCel.save();
        ctxCel.translate(this.x, this.y);
        ctxCel.rotate(this.r);
        ctxCel.scale(1, this.sy);

        ctxCel.fillStyle = this.color;
        ctxCel.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

        ctxCel.restore();
    }
};

let particles = [];

function initDrawingCanvas() {
    drawingCanvas.width = viewWidth;
    drawingCanvas.height = viewHeight;
    ctxCel = drawingCanvas.getContext('2d');


    createParticles();
}


function createParticles() {
    for (var i = 0; i < 128; i++) {
        var p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
        var p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

        particles.push(new Particle(p0, p1, p2, p3));
    }
}

function update() {

    particles.forEach(function (p) {
        p.update();
    });

}

function draw() {
    ctxCel.clearRect(0, 0, viewWidth, viewHeight);

    particles.forEach(function (p) {
        p.draw();
    });

}

function celebrate() {
    initDrawingCanvas();
    requestAnimationFrame(loop);
}

function loop() {
    update();
    draw();

    requestAnimationFrame(loop);
}


// math and stuff

/**
 * easing equations from http://gizma.com/easing/
 * t = current time
 * b = start value
 * c = delta value
 * d = duration
 */
var Ease = {
    inCubic: function (t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    },
    outCubic: function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    },
    inOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    },
    inBack: function (t, b, c, d, s) {
        s = s || 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
};

function cubeBezier(p0, c0, c1, p1, t) {
    var p = new Point();
    var nt = (1 - t);

    p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
    p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

    return p;
}




