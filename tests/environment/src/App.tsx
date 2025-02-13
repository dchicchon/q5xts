import React, { useEffect, useRef, useState } from 'react';
import { Q5, Vector } from '../../../src/index';
import nanoid from 'nanoid';
import './App.css';

function randInt(max: number, min?: number) {
  if (min) {
    return Math.floor(Math.random() * max) + min;
  }
  return Math.floor(Math.random() * max);
}

function createColors(length: number) {
  const list: Array<string> = [];
  for (let i = 0; i < length; i++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    list.push(`rgb(${r},${g},${b})`);
  }
  return list;
}

class Ball {
  position: Vector;
  velocity: Vector;
  direction: Vector;
  diameter: number;
  maxSpeed: number;
  minSpeed: number;

  constructor(height: number, width: number) {
    this.diameter = 25;
    this.maxSpeed = 15;
    this.minSpeed = 1;

    this.position = Q5.createVector(
      randInt(width - this.diameter, this.diameter),
      randInt(height - this.diameter, this.diameter)
    );

    this.velocity = Q5.createVector(
      randInt(this.maxSpeed, this.minSpeed),
      randInt(this.maxSpeed, this.minSpeed)
    );

    const dirs = [1, -1];
    this.direction = Q5.createVector(dirs[randInt(dirs.length)], randInt(dirs.length));
  }

  move() {
    this.velocity = this.velocity.mult(this.direction);
    this.position = this.position.add(this.velocity);
  }

  inBounds(ball: Ball) {
    return (
      this.position.x >= ball.position.x - ball.diameter / 2 &&
      this.position.x <= ball.position.x + ball.diameter / 2 &&
      this.position.y >= ball.position.y - ball.diameter / 2 &&
      this.position.y <= ball.position.y + ball.diameter / 2
    );
  }

  collide(ball: Ball) {
    this.direction = this.direction.mult(ball.direction);
  }
}

class Drawing extends Q5 {
  colors: Array<string>;
  ballCount: number;
  balls: Array<Ball>;
  pause: boolean;

  constructor(scope: 'global' | 'offscreen' | '', elm: HTMLDivElement) {
    super(scope, elm);
    this.ballCount = 50;
    this.colors = createColors(10);
    this.balls = [];
    this.pause = false;
  }

  setup() {
    this.frameRate(60);
    this.resizeCanvas(window.innerWidth, window.innerHeight);
    for (let i = 0; i < this.ballCount; i++) {
      const ball = new Ball(this.width, this.height);
      this.balls.push(ball);
    }
  }
  keyPressed(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.pause = !this.pause;
    }
  }
  draw() {
    this.background('rgb(1, 1, 1)');
    this.fill('white');
    this.balls.forEach((ball, i) => {
      this.circle(ball.position.x, ball.position.y, ball.diameter);
      if (!this.pause) {
        ball.move();
      } else {
        this.stroke('white');
        this.text(
          `position: ${ball.position.toString()}`,
          ball.position.x + 15,
          ball.position.y + 10
        );
        this.text(
          `direction: ${ball.direction.toString()}`,
          ball.position.x + 15,
          ball.position.y + 30
        );
        this.text(
          `velocity: ${ball.velocity.toString()}`,
          ball.position.x + 15,
          ball.position.y + 50
        );
      }
      this.balls.forEach((secondBall, j) => {
        if (i !== j) {
          if (ball.inBounds(secondBall)) {
            ball.collide(secondBall);
            secondBall.collide(ball);
          }
        }
      });

      if (!this.inXBounds(ball)) {
        ball.direction.x *= -1;
      }
      if (!this.inYBounds(ball)) {
        ball.direction.y *= -1;
      }
    });
  }
  inXBounds(ball: Ball) {
    return (
      ball.position.x - ball.diameter / 2 > 0 &&
      ball.position.x + ball.diameter / 2 <= this.width
    );
  }
  inYBounds(ball: Ball) {
    return (
      ball.position.y - ball.diameter / 2 > 0 &&
      ball.position.y + ball.diameter / 2 <= this.height
    );
  }
}

function App() {
  const [sketch, setSketch] = useState<Drawing | null>();
  const htmlRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (htmlRef.current && !sketch) {
      const newSketch = new Drawing('', htmlRef.current);
      setSketch(newSketch);
    }
    return () => {
      if (sketch) {
        console.log('Run cleanup');
        sketch.dispose();
        setSketch(null);
      }
    };
  }, []);

  return <div ref={htmlRef} id="sketch"></div>;
}

export default App;
