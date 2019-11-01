let Arrows = [];
let charges = [];
let chargesL = [];
let fpsCount = 0;
let chr = false;
let size = 20;
let fps = [];
var intervalID = window.setInterval(myCallback, 10000);

function setup() {
    createCanvas(innerWidth, innerHeight);
    createVectors();
    charges.push(createVector(mouseX, mouseY));
    chargesL.push(chr);
}

function mouseReleased() {
    charges.push(createVector(mouseX, mouseY));
    chargesL.push(chr);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        chargesL[chargesL.length - 1] = false;
        chr = false;
    } else if (keyCode === RIGHT_ARROW) {
        chargesL[chargesL.length - 1] = true;
        chr = true;
    }
}

function myCallback() {
    if (fpsCount < 60) {
        fps.push(frameRate().toFixed(2))
        console.log(fps)
        fpsCount++
    }
}

function draw() {
    background(37);
    if (charges.length > 0) {
        for (let i = 0; i < Arrows.length; i++) {
            Arrows[i].pull(charges, chargesL);
            Arrows[i].draw();
        }
    }
    for (let i = 0; i < charges.length; i++) {
        textAlign(CENTER);
        ellipse(charges[i].x, charges[i].y, size);
        if (chargesL[i]) {
            text("+", charges[i].x, charges[i].y + size / 5);
        } else {
            text("-", charges[i].x, charges[i].y + size / 5);
        }
    }
    charges[charges.length - 1].x = mouseX;
    charges[charges.length - 1].y = mouseY;
}

function createVectors() {
    let setSize = 5;
    for (let i = 0; i < width / setSize; i += setSize) {
        for (let j = 0; j < height / setSize; j += setSize) {
            Arrows.push(new Arrow(i * setSize, j * setSize));
        }
    }
}