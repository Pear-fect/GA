class Arrow {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.force = createVector(0, 0);
    }

    draw() {
        push();
        colorMode(HSB);
        let str = sqrt(sq(this.force.x) + sq(this.force.y));
        let len = map(str, 0, 1000, 0, 255);
        stroke(len, len, 255);
        let limitedForce = this.force.limit(50);
        line(this.pos.x, this.pos.y, limitedForce.x + this.pos.x, limitedForce.y + this.pos.y);
        ellipse(limitedForce.x + this.pos.x, limitedForce.y + this.pos.y, 2);
        pop();
    }

    pull(chr, chrL) {
        let SCALE = 10000;
        let k = 8.99 * Math.pow(10, 9);
        let vectorF = createVector(0, 0);
        angleMode(DEGREES);
        for (let i = 0; i < chr.length; i++) {
            var xd = (this.pos.x - chr[i].x);
            var yd = (this.pos.y - chr[i].y);
            var r = sq(xd) + sq(yd);
            if (chrL[i]) {
                var f = -k / r;
            } else {
                var f = k / r;
            }
            var a = atan2(yd, xd);
            vectorF.add(createVector(f * cos(a) / SCALE, f * sin(a) / SCALE));
        }
        this.force = createVector(0, 0);
        this.force.add(vectorF);
    }
}