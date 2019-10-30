let ball;
let g;
let f = 100000;
let clicked = false;
var intervalID = window.setInterval(myCallback, 10000);

function setup() {
    createCanvas(innerWidth, innerHeight);
    ball = new Ball(width / 2, height / 2, 100);
    g = createVector(0, 9.82);
}

function mousePressed() {
    clicked = true;
}

function myCallback() {
    fps.push(frameRate().toFixed(2))
    console.log(fps)
}

function draw() {
    background(37);

    if (clicked) {
        clicked = false;
        angleMode(DEGREES);
        var xd = (ball.pos.x - mouseX);
        var yd = (ball.pos.y - mouseY);
        var r = sqrt((xd * xd) + (yd * yd));
        var rScaled = map(r, 0, innerWidth, 1, 0);
        push();
        stroke(255);
        noFill();
        ellipse(mouseX, mouseY, rScaled * 1000);
        pop();
        var a = atan2(yd, xd);
        var fx = f * cos(a) * rScaled;
        var fy = f * sin(a) * rScaled;
        ball.applyForce(createVector(fx, fy));
    }

    ball.applyForce(g);
    ball.update();
    ball.show();
}