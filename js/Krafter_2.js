let ball;
let g;
let f = 100000;
let clicked = false;

function setup() {
    createCanvas(innerWidth, innerHeight);
    ball = new Ball(width / 2, height / 2, 100);
    g = createVector(0, 9.82);
}

function mousePressed() {
    clicked = true;
}

function draw() {
    background(37);

    fps = frameRate();
    push();
    textSize(32);
    stroke(255);
    fill(255);
    text(fps.toFixed(2), 40, 40);
    pop();
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