let canvas = ''
let ctx = ''
let increment = 0.04
let frequency = 0.02

function documentReady(init) {
    document.addEventListener("DOMContentLoaded", function (event) {
        init()
    });
}

function init() {
    canvas = document.getElementById('wave')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    createLine()
    animate()
}

function createLine() {
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.01) * 100)
    }
    ctx.stroke()
}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height / 2 + (Math.sin(i * -0.01 + increment) * 100 * Math.sin(increment)))
    }
    ctx.strokeStyle = 'hsl(115,80%,44%)'
    ctx.stroke()
    increment += frequency;
}

// start
documentReady(init)