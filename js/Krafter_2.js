let ball
let elast = 1.3
let fps = []
let g = 9.82
let f = 1000
let fpsCount = 0
let push = true
var intervalID = window.setInterval(myCallback, 10000)

function setup() {
    createCanvas(innerWidth, innerHeight)
    ball = new Ball(width / 2, height / 2, 100)
}

function keyPressed() {
    if (keyCode === SHIFT && push == true) {
        push = false
    } else if (keyCode === SHIFT && push == false) {
        push = true
    } else if (keyCode === ENTER) {
        ball.pos = createVector(width / 2, height / 2)
        ball.vel = createVector(0, 0)
    }
}

function mousePressed() {
    if (push) {
        var a = atan2(ball.pos.y - mouseY, ball.pos.x - mouseX)
        ball.applyForce(createVector(f * cos(a), f * sin(a)))
    } else {
        var a = atan2(ball.pos.y - mouseY, ball.pos.x - mouseX)
        ball.applyForce(createVector(-f * cos(a), -f * sin(a)))
    }
}

function myCallback() {
    if (fpsCount <= 60) {
        fps.push(frameRate().toFixed(2))
        console.log(fps)
        fpsCount++
    }
}

function draw() {
    background(37)
    ball.applyForce(createVector(0, g))

    if (push) {
        fill(255)
        ellipse(mouseX, mouseY, 25)
    } else {
        noFill()
        stroke(255)
        ellipse(mouseX, mouseY, 25)
    }

    if (ball.pos.x >= width) {
        ball.vel.x = -ball.vel.x
        ball.vel.div(elast)
    }
    if (ball.pos.x <= 0) {
        ball.vel.x = -ball.vel.x
        ball.vel.div(elast)
    }
    if (ball.pos.y >= height) {
        ball.vel.y = -ball.vel.y
        ball.vel.div(elast)
    }
    if (ball.pos.y <= 0) {
        ball.vel.y = -ball.vel.y
        ball.vel.div(elast)
    }

    ball.update()
    ball.show()
}