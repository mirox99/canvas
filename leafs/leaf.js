let canvas = ''
let ctx = ''
let width = window.innerWidth
let height = window.innerHeight


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
    createLeafs()
    draw()
    animation()
}


function animation() {
    ctx.clearRect(0, 0, width, height)
    loop()
    let img = new Image();
    ctx.globalCompositeOperation = 'destination-over';
    img.onload = function () {
        ctx.drawImage(img, 0, 0, img.width, img.height,
            0, 0, width, height)
    };

    img.src = 'forest.jpg';

    requestAnimationFrame(animation)

}

//leaf gravity
let leafs = []
const HALF_PI = Math.PI * 0.5;
let timeStep = (1 / 60);
Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

function Leaf(x, y, s, r, dx, dy) {
    this.x = x
    this.y = y
    this.s = s
    this.r = r
    this.dy = dx
    this.dx = dy
    this.tx = 10
    this.ty = 10
    this.turn = 1
    this.sy = 1

    this.draw = () => {
        //leafs
        let leaf = document.getElementById('leaf')
        ctx.save();
        ctx.rotate(this.r);
        ctx.scale(1, this.sy);
        ctx.drawImage(leaf, this.x, this.y, this.s, this.s)
        ctx.restore()
    }

    this.update = () => {
        this.y += this.dy
        this.x += this.dx
        this.sy = Math.cos(Math.PI * this.dy * 10);
        this.r = Math.atan2(dy, dx) ;

        this.draw()
    }
}

function createLeafs() {
    for (let i = 0; i < 100; i++) {
        let x = (Math.random() * width) + 1
        let s = (Math.random() * 30) + 20
        let r = Math.random()
        let dx = Math.random() * 3 + .4
        let dy = Math.random() * 3 + .4

        leafs.push(new Leaf(x, 0, s, r, dx, dy));
    }
}

function draw() {
    leafs.forEach(function (p) {
        p.draw();
    });

}

function update() {
    leafs.forEach((l) => {
        l.update();
    });

}

function loop() {
    update();
}

// start
documentReady(init)

///


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