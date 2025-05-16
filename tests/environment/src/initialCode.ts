export const initialCode = `


// Edit sketch code here
// keyword "this" refers to q5xts sketch to utilize
// "this" cannot be used outside of the "draw" and "sketch"
// functions
// Press "Play" button to run sketch
// View console to see log and error output

const colors = ['#6477c9', '#d3c85f', '#d2775f']
const particles = []
const particleCount = 10
const maxParticleCount = 1000;
const deleteQueue = []
let frameCount = 0;

function setup() {
    createParticles(this)
    this.frameRate(60)
    this.pixelDensity(window.devicePixelRatio)
    this.background('#ffffe1')
    // enable touch controls
    this.touchStarted = () => {}
    this.touchMoved   = () => {}
    this.touchEnded   = () => {}
}

function draw() {
    this.background('#ffffe1')

    spawnParticle(this)
    // every other frame spawn a particle

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        if (inXPos(this, particle.position.x) && inYPos(this, particle.position.y)) {
            particle.draw()
            particle.update()
        } else {
            deleteQueue.push(i)
        }
    }

    for (let i = 0; i < deleteQueue.length; i++) {
        const index = deleteQueue.pop()
        // swap and pop
        const temp = particles[index]
        particles[index] = particles[particles.length - 1]
        particles[particles.length - 1] = temp;
        particles.pop()
    }

    if (this.mouseIsPressed) {
        createParticle(this, this.mouseX, this.mouseY)
    }

}

function spawnParticle(sketch) {
    if (sketch.frameCount % 25 === 0) {
        createParticle(sketch, sketch.random(sketch.width), sketch.random(sketch.height))
    }
}

function vector(x, y) {
    return {
        x, y
    }
}

function randomVector(sketch) {
    const xPos = sketch.random(sketch.width);
    const yPos = sketch.random(sketch.height)
    return vector(xPos, yPos)
}

function createParticle(sketch, xPos, yPos) {
    if (particles.length + 1 > maxParticleCount) return;
    particles.push(new Particle(sketch, xPos, yPos))
}

function createParticles(sketch) {
    for (let i = 0; i < particleCount; i++) {
        createParticle(sketch, sketch.random(sketch.width), sketch.random(sketch.height))
    }
}

function inXPos(sketch, xPos) {
    return 0 < xPos && xPos < sketch.width
}

function inYPos(sketch, yPos) {
    return 0 < yPos && yPos < sketch.height
}

class Particle {
    constructor(sketch, xPos, yPos) {
        this.sketch = sketch;

        this.currentWeight = 1;
        this.maxStrokeWeight = this.sketch.random(10, 25)
        this.position = vector(xPos, yPos)
        this.color = colors[Math.floor(this.sketch.random(3))]
        const speed = 2;
        this.velocity = vector(this.sketch.random(-1 * speed, speed), this.sketch.random(-1 * speed, speed))
    }

    draw() {
        this.sketch.strokeWeight(this.currentWeight)
        this.sketch.stroke(this.color)
        this.sketch.point(this.position.x, this.position.y)
    }


    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.currentWeight < this.maxStrokeWeight) {
            this.currentWeight += 1
        }
    }
}
`;
