class Particle {

  constructor(pos = createVector(0, 0, 0), vel = createVector(0, 0, 0), acc = createVector(0, 0, 0)) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
  }

  setColor(col) {
    this.color = col;
  }

  show() {
    if (typeof this.color === 'object' && this.color !== 'null') {
      stroke(this.color == undefined ? 255 : this.color.r, this.color.g, this.color.b);
    } else {
      stroke(this.color == undefined ? 255 : this.color);
    }
    point(this.pos.x, this.pos.y, this.pos.z);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }
}