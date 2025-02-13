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
    this.sketch.draw = () => {
      this.draw();
    };
    this.sketch.setup = () => {
      this.setup();
    };
  }

  setup() {
    console.log('setup method');
    this.sketch.frameRate(30);
    this.sketch.height = window.innerHeight;
    this.sketch.width = window.innerWidth;
  }

  draw() {
    console.log('draw method');
    this.sketch.fill('white');
    this.sketch.rect(50, 50, 100, 100);
  }

  dispose() {
    this.sketch.dispose()
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
