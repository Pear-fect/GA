let balls = [];
let fpsCount = 0;
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
    sliderW = createSlider(-50, 50, 0);
    sliderW.position(20, 20);
    sliderB = createSlider(1, 100, 50);
    sliderB.position(20, 50);
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
    if (fpsCount <= 60) {
        fps.push(frameRate().toFixed(2))
        console.log(fps)
        fpsCount++
    }
}

function draw() {
    background(37)
    stroke(255)
    line(0, innerHeight * 0.25, width, innerHeight * 0.25)
    w = createVector(sliderW.value(), 0)
    count++

    push()
    noStroke()
    fill(255)
    text("Antal bollar", 20, 50)
    text("Vind riktning", 20, 20)
    pop()

    if (count == sliderB.value()) {
        balls.push(new Ball(width / 2, 0, 30))
        count = 0
    } else if (count > sliderB.value()) {
        count = 0
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].show()
        balls[i].applyForce(g)
        if (balls[i].pos.y > innerHeight * 0.25) {
            balls[i].applyForce(w)
        }
        balls[i].update()
    }
}