import { Q5 } from '../../../src/index';

export class Drawing extends Q5 {
  mydraw: Function;
  mysetup: Function;
  constructor(
    scope: 'global' | 'offscreen' | '',
    elm: HTMLElement,
    drawFn: Function,
    setupFn: Function
  ) {
    super(scope, elm);
    try {
      this.mydraw = drawFn.bind(this);
      this.mysetup = setupFn.bind(this);
    } catch {}

    this.draw = () => {
      try {
        this.mydraw();
      } catch (error) {
        console.log(error);
      }
    };

    this.setup = () => {
      try {
        this.mysetup();
      } catch {}
    };
  }
}
