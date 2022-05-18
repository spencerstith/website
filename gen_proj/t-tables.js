let N = 0;
let total = 200;
let r;
let delta;

function setup() {
    createCanvas(800, 800);
    r = width / 2 - 16;
    delta = TWO_PI / total;

    noFill();
    stroke(255);
}

function draw() {
    N += 0.01;
    background(0);
    translate(width / 2, height / 2);
    circle(0, 0, r * 2);

    for (let i = 0; i < total; i++) {
        let temp = getLocation(i * delta);
        circle(temp.x, temp.y, 2);
        let next = getLocation(getNextAngle(i));
        line(temp.x, temp.y, next.x, next.y);
    }
}

function getNextAngle(input) {
    return (input * N) % total * delta;
}

function getLocation(angle) {
    let ret = p5.Vector.fromAngle(angle + PI);
    ret.setMag(r);
    return ret;
}