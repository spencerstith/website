let center, left, right;

function setup() {
  createCanvas(600, 600).parent("canvas");
  rectMode(CENTER);
  center = new Group(createVector(300, 500), 2000, 5);
  left = new Group(createVector(150, 500), 1000, 3);
  right = new Group(createVector(450, 500), 1000, 3);
}

function draw() {
  background(0);
  center.show();
  left.show();
  right.show();
  stroke(255);
  line(0, 510, width, 510);
}

class Group {
  constructor(loc, number, multi) {
    this.loc = loc;
    this.number = number;
    this.parts = [];
    for (let i = 0; i < number; i++) {
      this.parts[i] = new Particle(createVector(loc.x, loc.y), multi);
    }
  }

  show() {
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].show();
    }
  }
}

class Particle {
  constructor(pos, multi) {
    this.pos = pos;
    this.multi = multi;
    this.original = createVector(pos.x, pos.y);
    this.construct();
    this.acc = createVector(0, 0.05).mult(multi);
    this.size = random(3);
  }

  show() {
    fill('#BEF0F5');
    noStroke();
    if (this.pos.y > 500) {
      this.construct();
    }
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }

  construct() {
    this.pos = createVector(this.original.x, this.original.y);
    this.angle = random(-QUARTER_PI - HALF_PI + PI / 4.5, -QUARTER_PI - PI / 4.5);
    this.vel = p5.Vector.fromAngle(this.angle).mult(random(this.multi * 2, this.multi * 3));
  }
}