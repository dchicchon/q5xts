export const initialCode = `


// Edit sketch code here
// keyword "this" refers to q5xts sketch to utilize
// "this" cannot be used outside of the "draw" and "sketch"
// functions
// Press "Play" button to run sketch

let particles = []
const particleCount = 10
const maxSpeed = 5;
const minSpeed = 2;

function randomInt(max, min) {
  if (min) {
    return Math.floor(Math.random() * max) + min
  }
  return Math.floor(Math.random() * max)
}

class Particle {
  constructor(sketch) {
    this.sketch = sketch
    this.diameter = 25;
    const xPos = randomInt(this.sketch.width -this.diameter, this.diameter)
    const yPos = randomInt(this.sketch.height - this.diameter, this.diameter)
    const xVel = randomInt(maxSpeed, minSpeed)
    const yVel = randomInt(maxSpeed, minSpeed)
    this.pos = this.sketch.createVector(xPos, yPos)
    this.velocity = this.sketch.createVector(xVel,yVel)
    const dirs = [1, -1];
    this.direction = this.sketch.createVector(dirs[randomInt(dirs.length)], randomInt(dirs.length));
    this.velocity.mult(this.direction);
  }

  draw() {
    this.sketch.fill('white')
    this.sketch.circle(this.pos.x, this.pos.y, this.diameter)
    this.move();
  }

  move() {
    this.pos.add(this.velocity)
  }
}

function inXBounds(width, particle) {
    return (
      particle.pos.x- particle.diameter / 2 > 0 &&
      particle.pos.x+ particle.diameter / 2 < width
    );
}

function inYBounds(height, particle) {
 return (
      particle.pos.y - particle.diameter / 2 > 0 &&
      particle.pos.y + particle.diameter / 2 < height
    );
}

function setup() {
  this.frameRate(60)
  this.resizeCanvas(this.parent.clientWidth, this.parent.clientHeight)
  for (let i =0; i < particleCount; i++) {
    const particle = new Particle(this);
    particles.push(particle)
  }
}

function draw() {
  this.background('black')
  particles.forEach(particle => {
    particle.draw()
    if (!inXBounds(this.width, particle)){
          particle.direction.mult(-1, particle.direction.y);
          particle.velocity.mult(particle.direction);
    }
    if (!inYBounds(this.height,particle)) {
          particle.direction.mult(particle.direction.x, -1);
          particle.velocity.mult(particle.direction);
        }
  })
}




`;
