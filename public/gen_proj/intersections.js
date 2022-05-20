let segments;
let dist;
let ver;
let hor;
let pg;

function setup() {
  createCanvas(600, 600).parent("canvas");
  segments = 8;
  dist = width / segments;
  ver = [];
  hor = [];
  for (let i = 0; i < segments - 1; i++) {
    let begin = dist / 2 + dist;
    let loc = begin + dist * i;
    let rate = 0.045 / (ver.length) * (i + 1);
    ver.push(new Rotator(createVector(loc, dist / 2), rate, 0.75 * dist, true));
    hor.push(new Rotator(createVector(dist / 2, loc), rate, 0.75 * dist, false));
  }
  pg = createGraphics(600, 600);
}

function draw() {
  background(0);
  stroke(255, 100);

  // Draw all lines
  for (let i = 0; i < ver.length; i++) {
    ver[i].show();
    hor[i].show();
    ver[i].update();
    hor[i].update();
  }
  pg.stroke(255);

  for (let i = 0; i < ver.length; i++) {
    for (let j = 0; j < hor.length; j++) {
      let x = ver[i].pos.x + ver[i].pointer.x;
      let y = hor[j].pos.y + hor[j].pointer.y;
      pg.point(x, y);
    }
  }
  image(pg, 0, 0);
}

class Rotator {
  constructor(pos, rate, radius, isVertical) {
    this.pos = pos;
    this.rate = rate;
    this.radius = radius;
    this.isVertical = isVertical;
    this.pointer = p5.Vector.fromAngle(0.0);
    this.pointer.setMag(radius / 2);
  }

  update() {
    this.pointer.rotate(this.rate);
  }

  show() {
    noFill();
    stroke(255);
    circle(this.pos.x, this.pos.y, this.radius);

    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.pointer.x, this.pointer.y);
    pop();
    stroke(255, 100);
    if (this.isVertical) {
      line(this.pos.x + this.pointer.x, 0, this.pos.x + this.pointer.x, height);
    } else {
      line(0, this.pos.y + this.pointer.y, width, this.pos.y + this.pointer.y);
    }
  }
}