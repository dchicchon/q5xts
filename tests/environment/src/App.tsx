import React, { useEffect, useRef, useState } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

import { Q5, Vector } from '../../../src/index';
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

const diameter = 10;
const count = 500;

class Ball {
  position: Vector;
  velocity: Vector;
  direction: Vector;
  diameter: number;
  maxSpeed: number;
  minSpeed: number;
  color: string;

  constructor(width: number, height: number, color) {
    this.diameter = diameter;
    this.maxSpeed = 5;
    this.minSpeed = 1;
    this.color = color;

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
    this.velocity.mult(this.direction);
  }

  move() {
    this.position.add(this.velocity);
  }

  inBounds(ball: Ball) {
    const distance = ball.position.dist(this.position);
    return distance <= this.diameter / 2 + ball.diameter / 2;
  }

  collide(ball: Ball) {
    this.direction.mult(ball.direction);
    this.velocity.mult(this.direction);
  }
}

class Drawing extends Q5 {
  colors: Array<string>;
  ballCount: number;
  balls: Array<Ball>;

  constructor(scope: 'global' | 'offscreen' | '', elm: HTMLDivElement) {
    super(scope, elm);
    this.ballCount = count;
    this.colors = createColors(10);
    this.balls = [];
    this.setup = () => {
      this.frameRate(60);
      this.resizeCanvas(window.innerWidth, window.innerHeight);
      for (let i = 0; i < this.ballCount; i++) {
        const ball = new Ball(
          this.width,
          this.height,
          this.colors[i % this.colors.length]
        );
        this.balls.push(ball);
      }
    };
    this.draw = () => {
      this.background('rgb(30, 33, 34)');
      this.balls.forEach((ball, i) => {
        this.fill(ball.color);
        this.circle(ball.position.x, ball.position.y, ball.diameter);
        this.balls.forEach((secondBall, j) => {
          if (i !== j) {
            if (ball.inBounds(secondBall)) {
              ball.collide(secondBall);
              secondBall.collide(ball);
            }
          }
        });
        if (!this.inXBounds(ball)) {
          ball.direction.mult(-1, ball.direction.y);
          ball.velocity.mult(ball.direction);
        }
        if (!this.inYBounds(ball)) {
          ball.direction.mult(ball.direction.x, -1);
          ball.velocity.mult(ball.direction);
        }
      });
    };
    this.keyPressed = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        this.pause = !this.pause;
      }
    };
  }

  inXBounds(ball: Ball) {
    return (
      ball.position.x + ball.maxSpeed - ball.diameter / 2 > 0 &&
      ball.position.x + ball.maxSpeed + ball.diameter / 2 < this.width
    );
  }

  inYBounds(ball: Ball) {
    return (
      ball.position.y + ball.maxSpeed - ball.diameter / 2 > 0 &&
      ball.position.y + ball.maxSpeed + ball.diameter / 2 < this.height
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div>
        <Editor
          theme="vs-dark"
          width="40vw"
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </div>
      <div
        style={{
          width: '60vw',
        }}
        ref={htmlRef}
        id="sketch"
      ></div>
      ;
    </div>
  );
}

export default App;
