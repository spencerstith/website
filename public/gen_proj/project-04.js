let left;
let right;
let convergence = 0.5;

function setup() {
  createCanvas(1200, 600).parent("canvas");
  left = new Cluster(300, 150, false);
  right = new Cluster(900, 150, true);
}

function draw() {
  background(0);
  strokeWeight(5);
  left.step();
  right.step();

}

class Cluster {
  constructor(xCenter, pCount, chaos) {
    this.xCenter = xCenter;
    this.chaos = chaos;
    this.particles = [];
    for (let i = 0; i < pCount; i++) {
      let radius = chaos ? random(175, 300) : 250;
      let amplitude = chaos ? random(5, 50) : 25
      let vel = chaos ? random(0.005, 0.05) : 0.02;

      let red = chaos ? random(150, 255) : random(200, 255);
      let green = chaos ? random(50, 250) : random(100, 200);
      let blue = chaos ? random(0, 150) : random(0, 100);

      this.particles.push(new Particle(radius, amplitude, vel, i * TWO_PI / pCount, {
        r: red,
        g: green,
        b: blue
      }));
    }
  }

  step() {
    this.particles.forEach(p => {
      push();
      translate(this.xCenter, height * 0.5);
      p.update();
      p.show();
      pop();
    })
  }
}

class Particle {
  constructor(radius, amplitude, vel, rotation, color) {
    this.radius = radius;
    this.amplitude = amplitude;
    this.vel = vel;
    this.rotation = rotation;
    this.angle = 0;
    this.wave = random(TWO_PI);
    this.color = color;
  }

  update() {
    this.angle += this.vel;
    this.wave += this.vel * 5;
    this.rod = this.radius + this.amplitude * sin(this.wave);


    // this.radius -= convergence;
    //this.vel += convergence / 10000;
  }

  show() {
    push();
    stroke(this.color.r, this.color.g, this.color.b);
    rotate(this.rotation);

    let x = this.rod * cos(this.angle);
    let y = this.rod * sin(this.angle);

    point(x, y);
    pop();
  }
}