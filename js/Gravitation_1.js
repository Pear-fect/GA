let fps;
let scheme;
let balls = [];
let mass = 50;
let count = 0;
let mouseOrigin;

function setup() {
  createCanvas(innerWidth, innerHeight);
  scheme = new Colors();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function mouseReleased() {
  balls.push(new OBJECT(mouseOrigin.x, mouseOrigin.y, count, createVector((mouseX - mouseOrigin.x) / 100, (mouseY - mouseOrigin.y) / 100)));
  count = 0;
}

function mousePressed() {
  mouseOrigin = createVector(mouseX, mouseY);
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

  if (mouseIsPressed) {
    count++;
    ellipse(mouseOrigin.x, mouseOrigin.y, count);
    push();
    stroke(scheme.accent);
    line(mouseOrigin.x, mouseOrigin.y, mouseX, mouseY)
    pop();
  }

  if (balls.length > 1) {
    for (let i = 0; i < balls.length; i++) {
      for (let j = 0; j < balls.length; j++) {
        if (i == j) {
          continue;
        } else {
          balls[i].grav(balls[j]);
        }
      }
    }
    for (let i = balls.length; i == 0; i--) {
      for (let j = balls.length; j == 0; j--) {
        if (i == j) {
          continue;
        } else if (balls[i].touch(balls[j])) {
          balls[i].mass += balls[j].mass;
          balls.splice(j);
        }
      }
    }
  }

  if (balls.length > 0) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].update();
      balls[i].show(scheme);
    }
  }
}