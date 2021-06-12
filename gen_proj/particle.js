class Particle {

    constructor(pos = createVector(0, 0, 0), vel = createVector(0, 0, 0), acc = createVector(0, 0, 0)) {
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
    }

    show() {
        point(this.pos.x, this.pos.y, this.pos.z);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
    }
}