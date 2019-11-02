class Ball {
    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = mass;
    }

    applyForce(force) {
        let accel = p5.Vector.div(force, this.mass);
        this.acc.add(accel);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc = createVector(0, 0);
    }

    show() {
        ellipse(this.pos.x, this.pos.y, sqrt(this.mass));
    }

}