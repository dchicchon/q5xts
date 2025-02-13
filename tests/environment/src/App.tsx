import React, { useEffect, useRef, useState } from 'react';
import Q5 from '../../../src/index';
import './App.css';
import { Vector } from '../../../src/Vector';

class Drawing {
  sketch: Q5;
  pos: Vector;
  constructor(elm: HTMLDivElement) {
    this.sketch = new Q5('', elm);
    this.pos = this.sketch.createVector(0, 0);
    this.setupListeners();
  }

  setupListeners() {
    this.sketch.setup = () => {
      this.setup();
    };
    this.sketch.draw = () => {
      this.draw();
    };
  }

  setup() {
    this.sketch.frameRate(30);
    this.sketch.height = window.innerHeight;
    this.sketch.width = window.innerWidth;
  }

  draw() {
    this.sketch.background('rgb(30, 33, 34)');
    this.sketch.fill('white');
    this.sketch.rect(this.pos.x, 50, 20, 20);
    this.pos.x += 1;
  }

  dispose() {
    this.sketch.dispose();
  }
}

function App() {
  const [sketch, setSketch] = useState<Drawing | null>();
  const htmlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (htmlRef.current && !sketch) {
      const newSketch = new Drawing(htmlRef.current);
      setSketch(newSketch);
    }
    return () => {
      if (sketch) {
        sketch.dispose();
        setSketch(null);
      }
    };
  }, []);

  return <div ref={htmlRef} id="sketch"></div>;
}

export default App;
