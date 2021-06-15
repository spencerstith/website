let drops;
let saved = false;

function setup() {
    createCanvas(600, 600);
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
    if (frameCount == 100) {
        saveFrames("project-01-shot", "png", 1, 1);
    }
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