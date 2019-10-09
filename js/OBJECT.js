class OBJECT {
    constructor(x, y, mass, acc) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = acc;
        this.mass = sq(mass);
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
        noStroke();
        ellipse(this.pos.x, this.pos.y, sqrt(this.mass));
        push();
        stroke(0);
        textAlign(CENTER);
        text(this.mass, this.pos.x, this.pos.y);
        pop();
    }

    grav(obj) {
        angleMode(DEGREES);
        var G = 6.674 * Math.pow(10, -11);
        var SCALE = 10000;

        var xd = (this.pos.x - obj.pos.x) / SCALE;
        var yd = (this.pos.y - obj.pos.y) / SCALE;
        var r = (xd * xd) + (yd * yd);
        var f = (G * (this.mass * obj.mass)) / r;
        var a = atan2(yd, xd);
        var fx = -f * cos(a);
        var fy = -f * sin(a);
        this.applyForce(createVector(fx, fy));
    }

    touch(obj) {
        var xd = (this.pos.x - obj.pos.x);
        var yd = (this.pos.y - obj.pos.y);
        var r = sqrt((xd * xd) + (yd * yd));

        if (r < sqrt(this.mass) / 2) {
            return true;
        } else {
            return false;
        }
    }

    bounce(obj) {
        let p1x = this.mass * this.vel.x;
        let p2x = obj.mass * obj.vel.x;
        let px = p1x + p2x;
        let mx = this.mass + obj.mass;
        let vx = (px / mx) * (this.mass / mx);
        this.vel.x += vx;

        let p1y = this.mass * this.vel.y;
        let p2y = obj.mass * obj.vel.y;
        let py = p1y + p2y;
        let my = this.mass + obj.mass;
        let vy = (py / my) * (this.mass / my);
        this.vel.y += vy;
    }
}