let balls = [];
let g;
let w;
let sliderW;
let sliderB;
let count = 0;
let fps = [];
var intervalID = window.setInterval(myCallback, 10000);

function setup() {
    createCanvas(innerWidth, innerHeight);
    g = createVector(0, 9.82);
    sliderW = createSlider(-100, 100, 0);
    sliderW.position(100, 100);
    sliderB = createSlider(1, 100, 50);
    sliderB.position(100, 120);
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}
/*
function mouseReleased() {
    balls.push(new Ball(width/2, 0, 30));
}
*/
function myCallback() {
    fps.push(frameRate().toFixed(2))
    console.log(fps)
}

function draw() {
    background(37);

    push();
    stroke(255);
    line(0, innerHeight * 0.25, width, innerHeight * 0.25);
    pop();
    w = createVector(sliderW.value(), 0);
    count++;

    if (count == sliderB.value()) {
        balls.push(new Ball(width / 2, 0, 30));
        count = 0;
    } else if (count > sliderB.value()) {
        count = 0;
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].show();
        balls[i].applyForce(g);
        if (balls[i].pos.y > innerHeight * 0.25) {
            balls[i].applyForce(w);
        }
        balls[i].update();
    }
}