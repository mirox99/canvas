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
    ctx.strokeStyle = 'black'
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
    ctx.strokeStyle = 'red'
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
    ctx.strokeStyle = 'green'
    ctx.ellipse(x, y, 15, 15, 0, 0, Math.PI * 2);
    ctx.stroke();
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        let hor = matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]
        let ver = matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]

        if (hor) return matrix[i][0]
        if (ver) return matrix[0][i]
    }
    let dia1 = matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]
    let dia2 = matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0]
console.log(dia2,dia1,'dis')
    if (dia1 || dia2) return matrix[1][1]
    if (matrix.length === 3 && matrix[0].length === 3 && matrix[1].length === 3 && matrix[2].length === 3) return 'draw'
}

function showWinner() {
    let title = document.getElementById('winner');

    if (typeof winner === "string") title.innerHTML = `The game end draw`;
    let win = winner === playerOne.id ? playerOne : playerTwo
    title.innerHTML = `The Winner is ${win.name}`
    canvas.style.pointerEvents = 'none'
    setTimeout(() => {
        restartGame()
    }, 300000)
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
    if (e.clientX < startX || e.clientX > endX || e.clientY < startY || e.clientY > endY) return
    let xi = Math.floor((e.clientX - startX) / 100)
    let yi = Math.floor((e.clientY - startY) / 100)

    let drawStartX = startX + xi * 100 + 50
    let drawStartY = startY + yi * 100 + 50

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