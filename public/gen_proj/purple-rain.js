let drops;
let saved = false;

function setup() {
  createCanvas(600, 600).parent("canvas")
    //stroke(200, 0, 255);
    drops = [];
    let xVel = random(-10, 10);
    for (let i = 0; i < 200; i++) {
        let size = random(5);

        let drop = new Drop(
            new Particle(
                createVector(random(width), random(height)),
                createVector(xVel, size * 2.5)
            ),
            size
        );
        drop.particle.setColor({ r: 200, g: 0, b: 200 });
        drops.push(drop);
    }
    textSize(25);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);
    drops.forEach(d => {
        d.activate();
    })
    fill(255);
    noStroke();
    text("i miss you", width * 0.75, height * 0.25);
}

class Drop {
    constructor(particle, size) {
        this.particle = particle;
        this.size = size;
    }

    activate() {
        if (this.particle.pos.y >= height) {
            this.particle.pos.y = 0;
        }
        if (this.particle.pos.x >= width) {
            this.particle.pos.x = 0;
        } else if (this.particle.pos.x <= 0) {
            this.particle.pos.x = width;
        }

        strokeWeight(this.size);
        //stroke(200, 0, 200);
        this.particle.show();
        this.particle.update();
    }
}

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