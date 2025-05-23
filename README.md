# q5.ts

This project is an TypeScript implementation of the [q5xjs project](https://github.com/LingDong-/q5xjs).

## Installation

```
npm i q5xts
```

## Usage

```
import { Q5 } from 'q5xts';

export class Drawing extends Q5 {
  constructor(
    scope: 'global' | 'offscreen' | '',
    elm: HTMLElement,

  ) {
    super(scope, elm);
    this.setup = () => {
        console.log('setup function here')
        this.frameRate(60);
    };

    this.draw = () => {
        console.log('draw function here')
        this.rect(0,0,100,100)
    };
  }
}
```

## Limitations

Currently this package does not provide the full usage of the original q5xjs package. Here we focus on utilizing it in a specified element scope and not the global scope.

This package is a work in progress and should include the capabilities of the original project later on

## Docs

Refer to the [original website](https://q5xjs.netlify.app/) or the original [github repo](https://github.com/LingDong-/q5xjs)

## Sandbox

You can view the sandbox environment here: https://dchicchon.github.io/q5xts/

## Example Projects

- [Circuits](https://github.com/dchicchon/circuits)

## Links

- [npm](https://www.npmjs.com/package/q5xts)
- [q5xjs github](https://github.com/LingDong-/q5xjs)
- [q5xjs docs](https://q5xjs.netlify.app/)
- [p5js docs](https://p5js.org/)
