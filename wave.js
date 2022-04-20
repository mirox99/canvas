let canvas = ''
let ctx = ''
let increment = 0.01
let frequency = 0.01

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)

    for (let k = 0; k < 10; k++) {
        let prevX = canvas.width / 2;
        let prevY = 0

        for (let i = 0; i < canvas.width; i++) {
            // let delta = k % 2 === 0 ? -(k * 20) : k * 20
            ctx.beginPath()
            ctx.lineWidth = 3;
            ctx.moveTo(prevX, prevY);
            let x = (canvas.width / 2) + k * 50 + (Math.sin(i * 0.007 + increment) * 100 * Math.sin(increment));
            let y = i > 9 * 50 ? 450 : i
            ctx.lineTo(x, y);
            prevX = x
            prevY = y
            // ctx.strokeStyle = `hsl(${(k*100)+(i/100)},${k+(i/40)}%,50%,0.3)`
            // ctx.strokeStyle = `rgba(${(k*100)+(i)},${(k*10)+(i)},200,1)`
            let r = Math.random() * 250 + 20;
            let g = Math.random() * 250 + 10;
            let b = Math.random() * 200 + 100;
            ctx.strokeStyle = `rgba(${r},${g},${b},1)`;
            ctx.stroke()
        }
    }

    for (let k = 0; k < 10; k++) {
        let prevX = canvas.width / 2;
        let prevY = 0

        for (let i = 0; i < canvas.width; i++) {
            // let delta = k % 2 === 0 ? -(k * 20) : k * 20
            ctx.beginPath()
            ctx.lineWidth = 3;
            ctx.moveTo(prevX, prevY);
            let x = i + canvas.width / 2 > canvas.width / 2 + 9 * 50 ? canvas.width / 2 + 9 * 50 : canvas.width / 2 + i
            let y = k * 50 + (Math.sin(i * 0.007 + increment) * 100 * Math.sin(increment));
            ctx.lineTo(x, y)
            prevX = x
            prevY = y
            // ctx.strokeStyle = `hsl(${(k*100)+(i/100)},${k+(i/40)}%,50%,0.3)`
            // ctx.strokeStyle = `rgba(${(k*100)+(i)},${(k*10)+(i)},200,1)`
            let r = Math.random() * 250 + 20;
            let g = Math.random() * 250 + 10;
            let b = Math.random() * 200 + 100;
            ctx.strokeStyle = `rgba(${r},${g},${b},1)`;
            ctx.stroke()
        }
    }


    increment += frequency;
}

// start
documentReady(init)