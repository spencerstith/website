let flowfield, particles;

let debug = false;

function setup() {
  createCanvas(600, 600).parent("canvas");

  flowfield = new FlowField(10);
  flowfield.update();

  particles = [];
  for (let i = 0; i < 5000; i++) {
    let start = createVector(random(width), random(height));
    particles.push(new Particle(start, random(2, 8)));
  }
  background(255);
}

function draw() {
  flowfield.update();
  particles.forEach(p => {
    p.follow(flowfield);
    p.run();
  });
}

class FlowField {
  constructor(res) {
    this.scl = res;
    this.cols = floor(width / res) + 1;
    this.rows = floor(height / res) + 1;
    this.vectors = Array(this.cols * this.rows);
    this.inc = 0.1;
    this.zoff = 0;
  }

  update() {
    let xoff = 0;
    for (let y = 0; y < this.rows; y++) {
      let yoff = 0;
      for (let x = 0; x < this.cols; x++) {
        let angle = noise(xoff, yoff, this.zoff) * TWO_PI * 4;

        let v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        let index = x + y * this.cols;
        this.vectors[index] = v;

        xoff += this.inc;
      }
      yoff += this.inc;
    }
    this.zoff += 0.004;
  }

  display() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        let v = this.vectors[index];

        stroke(0, 0, 0, 100);
        strokeWeight(0.5);
        push();
        translate(x * this.scl, y * this.scl);
        rotate(v.heading());
        line(0, 0, this.scl, 0);
        pop();
      }
    }
  }
}

class Particle {
  constructor(start, maxSpeed) {
    this.maxSpeed = maxSpeed;
    this.pos = start;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.previousPos = this.pos.copy();
  }

  run() {
    this.update();
    this.edges();
    this.show();
  }

  update() {
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(0, 5);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.previousPos.x, this.previousPos.y);
    //point(pos.x, pos.y);
    this.updatePreviousPos();
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePreviousPos();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePreviousPos();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePreviousPos();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePreviousPos();
    }
  }

  updatePreviousPos() {
    this.previousPos.x = this.pos.x;
    this.previousPos.y = this.pos.y;
  }

  follow(flowfield) {
    let x = floor(this.pos.x / flowfield.scl);
    let y = floor(this.pos.y / flowfield.scl);
    let index = x + y * flowfield.cols;
    
    let force = flowfield.vectors[index];
    this.applyForce(force);
  }
}