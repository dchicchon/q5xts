import type { Color } from './Color';
import type { Vector } from './Vector';
import { Lcg, Shr3, Ziggurat } from './Random';
import { MULT, ROTY, ROTX, TRFM } from './helpers';

/**
 * continue modularizing codebase for tree shaking
 * items to modularize
 *
 * - event listeners
 * - random items
 * - toHSV to RGB methods (remove or move to Color)
 * - reconsider how imaging works compared to original p5 method
 */

interface StyleType {
  colorMode: number;
  noStroke: boolean;
  noFill: boolean;
  ellipseMode: string;
  rectMode: number;
  curveDetail: number;
  curveAlpha: number;
  textFont: string;
  textSize: number;
  textLeading: number;
  textStyle: string;
}
interface KeysHeld {
  [id: number]: boolean;
}

/**
 * @class {Q5}
 * @classdesc Q5 wrapper for canvas element
 */
export class Q5 {
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
  ctx: CanvasRenderingContext2D;
  MAGIC: number;
  RGB: number;
  HSV: number;
  HSB: number;
  CHORD: number;
  PIE: number;
  OPEN: number;
  RADIUS: number;
  CORNER: number;
  CORNERS: number;
  ROUND: string;
  SQUARE: string;
  PROJECT: string;
  MITER: string;
  BEVEL: string;

  CLOSE: number;

  BLEND: string;
  REMOVE: string;
  ADD: string;
  DARKEST: string;
  LIGHTEST: string;
  DIFFERENCE: string;
  SUBTRACT: string;
  EXCLUSION: string;
  MULTIPLY: string;
  SCREEN: string;
  REPLACE: string;
  OVERLAY: string;
  HARD_LIGHT: string;
  SOFT_LIGHT: string;
  DODGE: string;
  BURN: string;

  NORMAL: string;
  ITALIC: string;
  BOLD: string;
  BOLDITALIC: string;

  CENTER: string;
  LEFT: string;
  RIGHT: string;
  TOP: string;
  BOTTOM: string;
  BASELINE: string;

  LANDSCAPE: string;
  PORTRAIT: string;

  ALT: number;
  BACKSPACE: number;
  CONTROL: number;
  DELETE: number;
  DOWN_ARROW: number;
  ENTER: number;
  ESCAPE: number;
  LEFT_ARROW: number;
  OPTION: number;
  RETURN: number;
  RIGHT_ARROW: number;
  SHIFT: number;
  TAB: number;
  UP_ARROW: number;

  HALF_PI: number;
  PI: number;
  QUARTER_PI: number;
  TAU: number;
  TWO_PI: number;

  THRESHOLD: number;
  GRAY: number;
  OPAQUE: number;
  INVERT: number;
  POSTERIZE: number;
  DILATE: number;
  ERODE: number;
  BLUR: number;

  ARROW: string;
  CROSS: string;
  HAND: string;
  MOVE: string;
  TEXT: string;

  VIDEO: { video: boolean; audio: boolean };
  AUDIO: { video: boolean; audio: boolean };

  SHR3: number;
  LCG: number;

  frameCount: number;
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
  mouseButton: any;
  keyIsPressed: boolean;
  mouseIsPressed: boolean;
  key: any;
  keyCode: number;
  pixels: any;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  relRotationX: number;
  relRotationY: number;
  relRotationZ: number;

  pAccelerationX: number;
  pAccelerationY: number;
  pAccelerationZ: number;
  pRotationX: number;
  pRotationY: number;
  pRotationZ: number;
  pRelRotationX: number;
  pRelRotationY: number;
  pRelRotationZ: number;

  touches: Array<any>;
  _styleCache: Array<StyleType>;
  _style: StyleType;

  _noLoop: boolean;
  _pixelDensity: number;
  _frameRate: number;
  _tint: Color | null;

  private looper: any;
  private firstVertex: boolean;
  private curveBuff: Array<any>;
  private imgData: any;
  private preloadCnt: number;
  private keysHeld: KeysHeld;
  private tmpCtx: any;
  private tmpCt2: any;
  private tmpBuf: any;

  abs: Function;
  ceil: Function;
  exp: Function;
  floor: Function;
  log: Function;
  mag: Function;
  max: Function;
  min: Function;
  round: Function;
  sqrt: Function;
  sin: Function;
  cos: Function;
  tan: Function;
  asin: Function;
  acos: Function;
  atan: Function;
  atan2: Function;

  PERLIN_YWRAPB: number;
  PERLIN_YWRAP: number;
  PERLIN_ZWRAPB: number;
  PERLIN_ZWRAP: number;
  PERLIN_SIZE: number;
  perlin_octaves: number;
  perlin_amp_falloff: number;
  scaled_cosine: Function;
  p_perlin: any;
  rng1: Shr3 | Lcg;
  ziggurat: Ziggurat;
  parent: HTMLElement;
  hasSensorPermission: boolean;

  // setup functions
  draw?: Function | null;
  setup?: Function | null;
  preload?: Function | null;
  mouseDragged?: Function | null;
  mouseMoved?: Function | null;
  mouseReleased?: Function | null;
  mousePressed?: Function | null;
  mouseClicked?: Function | null;
  keyPressed?: Function | null;
  keyTyped?: Function | null;
  keyReleased?: Function | null;
  touchStarted?: Function | null;
  touchMoved?: Function | null;
  touchEnded?: Function | null;

  constructor(scope?: 'global' | 'offscreen' | '', elm?: HTMLElement) {
    // TODO: if no parent should we expect window?
    this.parent = elm || document.body;
    this.width = elm ? this.parent.clientWidth : window.innerWidth;
    this.height = elm ? this.parent.clientHeight : window.innerHeight;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
    if (scope != 'offscreen') {
      this.parent.appendChild(this.canvas);
    }
    this.MAGIC = 0x9a0ce55;

    this.RGB = 0;
    this.HSV = 1;
    this.HSB = 1;

    this.CHORD = 0;
    this.PIE = 1;
    this.OPEN = 2;

    this.RADIUS = 1;
    this.CORNER = 2;
    this.CORNERS = 3;

    this.ROUND = 'round';
    this.SQUARE = 'butt';
    this.PROJECT = 'square';
    this.MITER = 'miter';
    this.BEVEL = 'bevel';

    this.CLOSE = 1;

    this.BLEND = 'source-over';
    this.REMOVE = 'destination-out';
    this.ADD = 'lighter';
    this.DARKEST = 'darken';
    this.LIGHTEST = 'lighten';
    this.DIFFERENCE = 'difference';
    this.SUBTRACT = 'subtract';
    this.EXCLUSION = 'exclusion';
    this.MULTIPLY = 'multiply';
    this.SCREEN = 'screen';
    this.REPLACE = 'copy';
    this.OVERLAY = 'overlay';
    this.HARD_LIGHT = 'hard-light';
    this.SOFT_LIGHT = 'soft-light';
    this.DODGE = 'color-dodge';
    this.BURN = 'color-burn';

    this.NORMAL = 'normal';
    this.ITALIC = 'italic';
    this.BOLD = 'bold';
    this.BOLDITALIC = 'italic bold';

    this.CENTER = 'center';
    this.LEFT = 'left';
    this.RIGHT = 'right';
    this.TOP = 'top';
    this.BOTTOM = 'bottom';
    this.BASELINE = 'alphabetic';

    this.LANDSCAPE = 'landscape';
    this.PORTRAIT = 'portrait';

    this.ALT = 18;
    this.BACKSPACE = 8;
    this.CONTROL = 17;
    this.DELETE = 46;
    this.DOWN_ARROW = 40;
    this.ENTER = 13;
    this.ESCAPE = 27;
    this.LEFT_ARROW = 37;
    this.OPTION = 18;
    this.RETURN = 13;
    this.RIGHT_ARROW = 39;
    this.SHIFT = 16;
    this.TAB = 9;
    this.UP_ARROW = 38;

    this.HALF_PI = Math.PI / 2;
    this.PI = Math.PI;
    this.QUARTER_PI = Math.PI / 4;
    this.TAU = Math.PI * 2;
    this.TWO_PI = Math.PI * 2;

    this.THRESHOLD = 1;
    this.GRAY = 2;
    this.OPAQUE = 3;
    this.INVERT = 4;
    this.POSTERIZE = 5;
    this.DILATE = 6;
    this.ERODE = 7;
    this.BLUR = 8;

    this.ARROW = 'default';
    this.CROSS = 'crosshair';
    this.HAND = 'pointer';
    this.MOVE = 'move';
    this.TEXT = 'text';

    this.VIDEO = { video: true, audio: false };
    this.AUDIO = { video: false, audio: true };

    this.SHR3 = 1;
    this.LCG = 2;

    //================================================================
    // PUBLIC PROPERTIES
    //================================================================
    this.frameCount = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pmouseX = 0;
    this.pmouseY = 0;
    this.mouseButton = null;
    this.keyIsPressed = false;
    this.mouseIsPressed = false;
    this.key = null;
    this.keyCode = 0;
    this.pixels = null;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.accelerationZ = 0;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.relRotationX = 0;
    this.relRotationY = 0;
    this.relRotationZ = 0;

    this.pAccelerationX = 0;
    this.pAccelerationY = 0;
    this.pAccelerationZ = 0;
    this.pRotationX = 0;
    this.pRotationY = 0;
    this.pRotationZ = 0;
    this.pRelRotationX = 0;
    this.pRelRotationY = 0;
    this.pRelRotationZ = 0;

    this.touches = [];

    this._styleCache = [
      {
        colorMode: this.RGB,
        noStroke: false,
        noFill: false,
        ellipseMode: this.CENTER,
        rectMode: this.CORNER,
        curveDetail: 20,
        curveAlpha: 0.0,
        textFont: 'sans-serif',
        textSize: 12,
        textLeading: 12,
        textStyle: 'normal',
      },
    ];
    this._style = this._styleCache[this._styleCache.length - 1];

    this._noLoop = false;

    this._pixelDensity = 1;

    this._frameRate = 30;

    this._tint = null;

    //================================================================
    // PRIVATE VARS
    //================================================================
    this.looper = null;
    this.firstVertex = true;
    this.curveBuff = [];
    this.imgData = null;
    this.preloadCnt = 0;
    this.keysHeld = {};
    this.tmpCtx = null;
    this.tmpCt2 = null;
    this.tmpBuf = null;

    //================================================================
    // CANVAS
    //================================================================

    //================================================================
    // MATH
    //================================================================

    this.abs = Math.abs;
    this.ceil = Math.ceil;
    this.exp = Math.exp;
    this.floor = Math.floor;
    this.log = Math.log;
    this.mag = Math.hypot;
    this.max = Math.max;
    this.min = Math.min;
    this.round = Math.round;
    this.sqrt = Math.sqrt;
    this.sin = Math.sin;
    this.cos = Math.cos;
    this.tan = Math.tan;
    this.asin = Math.asin;
    this.acos = Math.acos;
    this.atan = Math.atan;
    this.atan2 = Math.atan2;

    this.PERLIN_YWRAPB = 4;
    this.PERLIN_YWRAP = 1 << this.PERLIN_YWRAPB;
    this.PERLIN_ZWRAPB = 8;
    this.PERLIN_ZWRAP = 1 << this.PERLIN_ZWRAPB;
    this.PERLIN_SIZE = 4095;
    this.perlin_octaves = 4;
    this.perlin_amp_falloff = 0.5;
    this.scaled_cosine = function (i: number) {
      return 0.5 * (1.0 - Math.cos(i * Math.PI));
    };
    this.p_perlin;

    this.rng1 = new Shr3();
    this.rng1.setSeed();

    this.ziggurat = new Ziggurat(this.rng1);

    this.draw = null;
    this.setup = null;
    this.preload = null;
    this.mouseDragged = null;
    this.mouseMoved = null;
    this.mouseReleased = null;
    this.mousePressed = null;
    this.mouseClicked = null;
    this.keyPressed = null;
    this.keyTyped = null;
    this.keyReleased = null;
    this.touchStarted = null;
    this.touchMoved = null;
    this.touchEnded = null;

    setTimeout(() => {
      this.preload && this.preload();
      this._start();
    }, 1);

    this.canvas.onmousemove = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;

      if (this.mouseIsPressed) {
        this.mouseDragged && this.mouseDragged(event);
      } else {
        this.mouseMoved && this.mouseMoved(event);
      }
    };
    this.canvas.onmousedown = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.mouseIsPressed = true;
      this.mouseButton = [this.LEFT, this.CENTER, this.RIGHT][event.button];
      this.mousePressed && this.mousePressed(event);
    };
    this.canvas.onmouseup = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.mouseIsPressed = false;
      this.mouseReleased && this.mouseReleased(event);
    };
    this.canvas.onclick = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.mouseIsPressed = true;
      this.mouseClicked && this.mouseClicked(event);
      this.mouseIsPressed = false;
    };
    window.addEventListener('keydown', (event) => {
      this.keyIsPressed = true;
      this.key = event.key;
      this.keyCode = event.keyCode;
      this.keysHeld[this.keyCode] = true;
      this.keyPressed && this.keyPressed(event);
      if (event.key.length == 1) {
        this.keyTyped && this.keyTyped(event);
      }
    });
    window.addEventListener('keyup', (event) => {
      this.keyIsPressed = false;
      this.key = event.key;
      this.keyCode = event.keyCode;
      this.keysHeld[this.keyCode] = false;
      this.keyReleased && this.keyReleased(event);
    });

    this.canvas.ontouchstart = (event) => {
      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches.item(i);
        this.touches.push(this.getTouchInfo(touch));
      }
      if (this.isTouchAware()) {
        this.pmouseX = this.mouseX;
        this.pmouseY = this.mouseY;
        this.mouseX = this.touches[this.touches.length - 1].x;
        this.mouseY = this.touches[this.touches.length - 1].y;
        this.mouseIsPressed = true;
        this.mouseButton = this.LEFT;
        if (!this.mousePressed) {
          event.preventDefault();
        }
      }
      if (!this.touchStarted) {
        event.preventDefault();
      }
    };
    this.canvas.ontouchmove = (event) => {
      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches.item(i);
        this.touches.push(this.getTouchInfo(touch));
      }
      if (this.isTouchAware()) {
        this.pmouseX = this.mouseX;
        this.pmouseY = this.mouseY;
        this.mouseX = this.touches[this.touches.length - 1].x;
        this.mouseY = this.touches[this.touches.length - 1].y;
        this.mouseIsPressed = true;
        this.mouseButton = this.LEFT;
        if (!this.mouseDragged) {
          event.preventDefault();
        }
      }
      if (!this.touchMoved) {
        event.preventDefault();
      }
    };
    this.canvas.ontouchend = this.canvas.ontouchcancel = (event) => {
      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches.item(i);
        this.touches.push(this.getTouchInfo(touch));
      }
      if (this.isTouchAware()) {
        this.pmouseX = this.mouseX;
        this.pmouseY = this.mouseY;
        this.mouseX = this.touches[this.touches.length - 1].x;
        this.mouseY = this.touches[this.touches.length - 1].y;
        this.mouseIsPressed = false;
        this.touches = [];
        if (!this.mouseReleased) {
          event.preventDefault();
        }
      }
      if (!this.touchEnded) {
        event.preventDefault();
      }
    };

    this.hasSensorPermission =
      (!window.DeviceOrientationEvent && !window.DeviceMotionEvent) ||
      // @ts-expect-error requestPermission is not found on event.
      !(DeviceOrientationEvent.requestPermission || DeviceMotionEvent.requestPermission);

    //================================================================
    // SENSORS
    //================================================================

    window.ondeviceorientation = (event: DeviceOrientationEvent) => {
      this.pRotationX = this.rotationX;
      this.pRotationY = this.rotationY;
      this.pRotationZ = this.rotationZ;
      this.pRelRotationX = this.relRotationX;
      this.pRelRotationY = this.relRotationY;
      this.pRelRotationZ = this.relRotationZ;

      if (event.beta) {
        this.rotationX = event.beta * (Math.PI / 180.0);
      }
      if (event.gamma) {
        this.rotationY = event.gamma * (Math.PI / 180.0);
      }
      if (event.alpha) {
        this.rotationZ = event.alpha * (Math.PI / 180.0);
      }
      this.relRotationX = [-this.rotationY, -this.rotationX, this.rotationY][
        ~~(window.orientation / 90) + 1
      ];
      this.relRotationY = [-this.rotationX, this.rotationY, this.rotationX][
        ~~(window.orientation / 90) + 1
      ];
      this.relRotationZ = this.rotationZ;
    };

    window.ondevicemotion = (event) => {
      this.pAccelerationX = this.accelerationX;
      this.pAccelerationY = this.accelerationY;
      this.pAccelerationZ = this.accelerationZ;
      if (!event.acceleration) {
        // devices that don't support plain acceleration
        // compute gravitational acceleration's component on X Y Z axes based on gyroscope
        // g = ~ 9.80665
        let grav = TRFM(
          MULT(ROTY(this.rotationY), ROTX(this.rotationX)),
          [0, 0, -9.80665]
        );
        if (event.accelerationIncludingGravity?.x) {
          this.accelerationX = event.accelerationIncludingGravity.x + grav[0];
        }
        if (event.accelerationIncludingGravity?.y) {
          this.accelerationY = event.accelerationIncludingGravity.y + grav[1];
        }
        if (event.accelerationIncludingGravity?.z) {
          this.accelerationZ = event.accelerationIncludingGravity.z - grav[2];
        }
      }
    };
  }

  // constructor fn really long?

  static hsv2rgb(h: number, s: number, v: number): Array<number> {
    //https://stackoverflow.com/questions/3018313/algorithm-to-convert-rgb-to-hsv-and-hsv-to-rgb-in-range-0-255-for-both
    let r, g, b;
    let hh, i, ff, p, q, t;
    if (s == 0) {
      r = v;
      g = v;
      b = v;
      return [r * 255, g * 255, b * 255];
    }
    hh = h;
    if (hh > 360) hh = 0;
    hh /= 60;
    i = ~~hh;
    ff = hh - i;
    p = v * (1.0 - s);
    q = v * (1.0 - s * ff);
    t = v * (1.0 - s * (1.0 - ff));
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      default:
        r = v;
        g = p;
        b = q;
        break;
    }
    return [r * 255, g * 255, b * 255];
  }
  static rgb2hsv(r: number, g: number, b: number): Array<number> {
    //https://stackoverflow.com/questions/3018313/algorithm-to-convert-rgb-to-hsv-and-hsv-to-rgb-in-range-0-255-for-both
    let rgbMin, rgbMax;
    let h, s, v;
    rgbMin = r < g ? (r < b ? r : b) : g < b ? g : b;
    rgbMax = r > g ? (r > b ? r : b) : g > b ? g : b;
    v = (rgbMax * 100) / 255;
    if (v == 0) {
      h = 0;
      s = 0;
      return [h, s, v];
    }
    s = (100 * (rgbMax - rgbMin)) / rgbMax;
    if (s == 0) {
      h = 0;
      return [h, s, v];
    }
    if (rgbMax == r) h = 0 + (60 * (g - b)) / (rgbMax - rgbMin);
    else if (rgbMax == g) h = 120 + (60 * (b - r)) / (rgbMax - rgbMin);
    else h = 240 + (60 * (r - g)) / (rgbMax - rgbMin);
    return [h, s, v];
  }

  get deviceOrientation(): string {
    return Math.abs(window.orientation) == 90 ? this.LANDSCAPE : this.PORTRAIT;
  }

  get windowWidth(): number {
    return window.innerWidth;
  }

  get windowHeight(): number {
    return window.innerHeight;
  }

  get drawingContext() {
    return this.ctx;
  }

  // default functions to override
  // SETUP
  dispose() {
    delete this.draw;
    delete this.setup;
    if (this.canvas && this.parent) {
      // console.log(this.canvas, this.parent);
      // TODO: Figure out why this is not working sometimes
      // TODO: leads to no sketch being shown
      try {
        this.parent.removeChild(this.canvas);
      } catch {}
    }
  }

  createCanvas(width: number, height: number): HTMLCanvasElement {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.defaultStyle();
    return this.canvas;
  }

  resizeCanvas(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  createGraphics(width: number, height: number) {
    let g = new Q5('offscreen');
    g.createCanvas(width, height);
    g.noLoop();
    return g;
  }

  pixelDensity(n?: number) {
    if (n == undefined) {
      return this._pixelDensity;
    }
    this._pixelDensity = n;

    this.canvas.width = Math.ceil(this.width * n);
    this.canvas.height = Math.ceil(this.height * n);
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';

    this.ctx.scale(this._pixelDensity, this._pixelDensity);
    this.defaultStyle();
    return this._pixelDensity;
  }

  map(
    value: number,
    istart: number,
    istop: number,
    ostart: number,
    ostop: number,
    clamp?: number
  ): number {
    let val = ostart + (ostop - ostart) * (((value - istart) * 1.0) / (istop - istart));
    if (!clamp) {
      return val;
    }
    if (ostart < ostop) {
      return Math.min(Math.max(val, ostart), ostop);
    } else {
      return Math.min(Math.max(val, ostop), ostart);
    }
  }

  lerp(start: number, stop: number, t: number) {
    return start * (1 - t) + stop * t;
  }
  constrain(x: number, lo: number, hi: number) {
    return Math.min(Math.max(x, lo), hi);
  }
  dist() {
    if (arguments.length == 4) {
      return Math.hypot(arguments[0] - arguments[2], arguments[1] - arguments[3]);
    } else {
      return Math.hypot(
        arguments[0] - arguments[3],
        arguments[1] - arguments[4],
        arguments[2] - arguments[5]
      );
    }
  }
  norm(value: number, start: number, stop: number) {
    return this.map(value, start, stop, 0, 1);
  }
  sq(x: number) {
    return x * x;
  }
  fract(x: number) {
    return x - Math.floor(x);
  }
  degrees(x: number) {
    return (x * 180) / Math.PI;
  }
  radians(x: number) {
    return (x * Math.PI) / 180;
  }
  curvePoint(a: number, b: number, c: number, d: number, t: number) {
    const t3 = t * t * t,
      t2 = t * t,
      f1 = -0.5 * t3 + t2 - 0.5 * t,
      f2 = 1.5 * t3 - 2.5 * t2 + 1.0,
      f3 = -1.5 * t3 + 2.0 * t2 + 0.5 * t,
      f4 = 0.5 * t3 - 0.5 * t2;
    return a * f1 + b * f2 + c * f3 + d * f4;
  }
  bezierPoint(a: number, b: number, c: number, d: number, t: number) {
    const adjustedT = 1 - t;
    return (
      Math.pow(adjustedT, 3) * a +
      3 * Math.pow(adjustedT, 2) * t * b +
      3 * adjustedT * Math.pow(t, 2) * c +
      Math.pow(t, 3) * d
    );
  }
  curveTangent(a: number, b: number, c: number, d: number, t: number) {
    const t2 = t * t,
      f1 = (-3 * t2) / 2 + 2 * t - 0.5,
      f2 = (9 * t2) / 2 - 5 * t,
      f3 = (-9 * t2) / 2 + 4 * t + 0.5,
      f4 = (3 * t2) / 2 - t;
    return a * f1 + b * f2 + c * f3 + d * f4;
  }
  bezierTangent(a: number, b: number, c: number, d: number, t: number) {
    const adjustedT = 1 - t;
    return (
      3 * d * Math.pow(t, 2) -
      3 * c * Math.pow(t, 2) +
      6 * c * adjustedT * t -
      6 * b * adjustedT * t +
      3 * b * Math.pow(adjustedT, 2) -
      3 * a * Math.pow(adjustedT, 2)
    );
  }

  colorMode(mode: number) {
    this._style.colorMode = mode;
  }

  strokeWeight(n: number) {
    this._style.noStroke = false;
    this.ctx.lineWidth = n;
  }

  /**
   * Set stroke
   * @param r
   * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
   */
  stroke(r: string | Color) {
    this._style.noStroke = false;
    if (typeof r == 'string') {
      this.ctx.strokeStyle = r;
    } else {
      this.ctx.strokeStyle = r.toString();
    }
  }

  noStroke() {
    this._style.noStroke = true;
  }

  /**
   *
   * Set a color as a fill
   * @param r
   * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
   */
  fill(r: string | Color) {
    this._style.noFill = false;
    if (typeof r == 'string') {
      this.ctx.fillStyle = r;
    } else {
      this.ctx.fillStyle = r.toString();
    }
  }

  noFill() {
    this._style.noFill = true;
  }

  /**
   *
   * @name blendMode
   * @param {GlobalCompositeOperation} globalCompositeOp
   * @summary Set blend mode for canvas
   * @see docs https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
   */
  blendMode(globalCompositeOp: GlobalCompositeOperation) {
    this.ctx.globalCompositeOperation = globalCompositeOp;
  }

  /**
   * @method strokeCap
   * @param {CanvasLineCap} linecap
   */
  strokeCap(linecap: CanvasLineCap) {
    this.ctx.lineCap = linecap;
  }

  strokeJoin(x: CanvasLineJoin) {
    this.ctx.lineJoin = x;
  }

  ellipseMode(x: string) {
    this._style.ellipseMode = x;
  }

  rectMode(x: number) {
    this._style.rectMode = x;
  }
  curveDetail(x: number) {
    this._style.curveDetail = x;
  }

  curveAlpha(x: number) {
    this._style.curveAlpha = x;
  }

  curveTightness(x: number) {
    console.warn(
      "curveTightness() sets the 'alpha' parameter of Catmull-Rom curve, and is NOT identical to p5.js counterpart. As this might change in the future, please call curveAlpha() directly."
    );
    this._style.curveAlpha = x;
  }

  defaultStyle() {
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'miter';
  }

  //================================================================
  // DRAWING
  //================================================================

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  background(color: Color | string) {
    // related to making background image
    if (arguments[0] && arguments[0].MAGIC == this.MAGIC) {
      return this.image(arguments[0], 0, 0, this.width, this.height);
    }
    this.ctx.save();
    this.ctx.resetTransform();
    this.ctx.scale(this._pixelDensity, this._pixelDensity);
    if (typeof color == 'string') {
      this.ctx.fillStyle = color;
    } else {
      this.ctx.fillStyle = color.toString();
    }
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  line(x0: number, y0: number, x1: number, y1: number) {
    if (!this._style.noStroke) {
      this.ctx.beginPath();
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
      this.ctx.stroke();
    }
  }

  lerpHue(h0: number, h1: number, t: number) {
    var methods = [
      [Math.abs(h1 - h0), this.map(t, 0, 1, h0, h1)],
      [Math.abs(h1 + 360 - h0), this.map(t, 0, 1, h0, h1 + 360)],
      [Math.abs(h1 - 360 - h0), this.map(t, 0, 1, h0, h1 - 360)],
    ];
    methods.sort((x, y) => x[0] - y[0]);
    return (methods[0][1] + 720) % 360;
  }

  static norm2PI(x: number): number {
    if (0 <= x && x < Math.PI * 2) {
      return x;
    }
    while (x < 0) {
      x += Math.PI * 2;
    }
    while (x >= Math.PI) {
      x -= Math.PI * 2;
    }
    return x;
  }

  arcImpl(
    x: number,
    y: number,
    w: number,
    h: number,
    start: number,
    stop: number,
    mode: number,
    detail: number
  ) {
    if (this._style.noFill && this._style.noStroke) {
      return;
    }
    let lo = Q5.norm2PI(start);
    let hi = Q5.norm2PI(stop);
    this.ctx.beginPath();
    for (let i = 0; i < detail + 1; i++) {
      let t = i / detail;
      let a = this.lerp(lo, hi, t);
      let dx = (Math.cos(a) * w) / 2;
      let dy = (Math.sin(a) * h) / 2;
      this.ctx[i ? 'lineTo' : 'moveTo'](x + dx, y + dy);
    }
    if (mode == this.CHORD) {
      this.ctx.closePath();
    } else if (mode == this.PIE) {
      this.ctx.lineTo(x, y);
      this.ctx.closePath();
    }
    if (!this._style.noFill) this.ctx.fill();
    if (!this._style.noStroke) this.ctx.stroke();
  }

  arc(
    x: number,
    y: number,
    w: number,
    h: number,
    start: number,
    stop: number,
    mode?: number,
    detail?: number
  ) {
    if (start == stop) {
      return this.ellipse(x, y, w, h);
    }
    if (detail == undefined) {
      detail = 25;
    }
    if (mode == undefined) {
      mode = this.PIE;
    }
    if (this._style.ellipseMode == this.CENTER) {
      this.arcImpl(x, y, w, h, start, stop, mode, detail);

      //@ts-expect-error string not assignable to number
    } else if (this._style.ellipseMode == this.RADIUS) {
      this.arcImpl(x, y, w * 2, h * 2, start, stop, mode, detail);
      //@ts-expect-error string not assignable to number
    } else if (this._style.ellipseMode == this.CORNER) {
      this.arcImpl(x + w / 2, y + h / 2, w, h, start, stop, mode, detail);
      //@ts-expect-error string not assignable to number
    } else if (this._style.ellipseMode == this.CORNERS) {
      this.arcImpl((x + w) / 2, (y + h) / 2, w - x, h - y, start, stop, mode, detail);
    }
  }

  ellipseImpl(x: number, y: number, w: number, h: number) {
    if (this._style.noFill && this._style.noStroke) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
    if (!this._style.noFill) this.ctx.fill();
    if (!this._style.noStroke) this.ctx.stroke();
  }

  // TODO: TOFIX
  ellipse(x: number, y: number, w: number, h?: number) {
    if (h == undefined) {
      h = w;
    }
    if (this._style.ellipseMode == this.CENTER) {
      this.ellipseImpl(x, y, w, h);
      //@ts-expect-error string not assignable to number
    } else if (this._style.ellipseMode == this.RADIUS) {
      this.ellipseImpl(x, y, w * 2, h * 2);
      //@ts-expect-error string not assignable to number
    } else if (this._style.ellipseMode == this.CORNER) {
      this.ellipseImpl(x + w / 2, y + h / 2, w, h);
      //@ts-expect-error string not assignable to number
    } else if (this._style.ellipseMode == this.CORNERS) {
      this.ellipseImpl((x + w) / 2, (y + h) / 2, w - x, h - y);
    }
  }

  circle(x: number, y: number, r: number) {
    return this.ellipse(x, y, r, r);
  }

  point(x: Vector | number, y?: number) {
    if (typeof x !== 'number' && x.x && x.y) {
      y = x.y;
      x = x.x;
    }
    if (typeof x !== 'number' || y === undefined) return;
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, 0.4, 0.4, 0, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  rectImpl(x: number, y: number, w: number, h: number): void {
    if (!this._style.noFill) {
      this.ctx.fillRect(x, y, w, h);
    }
    if (!this._style.noStroke) {
      this.ctx.strokeRect(x, y, w, h);
    }
  }

  roundedRectImpl(
    x: number,
    y: number,
    w: number,
    h: number,
    tl?: number,
    tr?: number,
    br?: number,
    bl?: number
  ): number | void {
    if (this._style.noFill && this._style.noStroke) {
      return;
    }
    if (tl == undefined) {
      return this.rectImpl(x, y, w, h);
    }
    if (tr == undefined) {
      return this.roundedRectImpl(x, y, w, h, tl, tl, tl, tl);
    }
    const hh = Math.min(Math.abs(h), Math.abs(w)) / 2;
    tl = Math.min(hh, tl);
    tr = Math.min(hh, tr);
    bl = Math.min(hh, bl!);
    br = Math.min(hh, br!);
    this.ctx.beginPath();
    this.ctx.moveTo(x + tl, y);
    this.ctx.arcTo(x + w, y, x + w, y + h, tr);
    this.ctx.arcTo(x + w, y + h, x, y + h, br);
    this.ctx.arcTo(x, y + h, x, y, bl);
    this.ctx.arcTo(x, y, x + w, y, tl);
    this.ctx.closePath();
    if (!this._style.noFill) this.ctx.fill();
    if (!this._style.noStroke) this.ctx.stroke();
  }

  // TODO: TOFIX
  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    tl?: number,
    tr?: number,
    br?: number,
    bl?: number
  ) {
    //@ts-expect-error number not assignable to string
    if (this._style.rectMode == this.CENTER) {
      this.roundedRectImpl(x - width / 2, y - height / 2, width, height, tl, tr, br, bl);
    } else if (this._style.rectMode == this.RADIUS) {
      this.roundedRectImpl(x - width, y - height, width * 2, height * 2, tl, tr, br, bl);
    } else if (this._style.rectMode == this.CORNER) {
      this.roundedRectImpl(x, y, width, height, tl, tr, br, bl);
    } else if (this._style.rectMode == this.CORNERS) {
      this.roundedRectImpl(x, y, width - x, height - y, tl, tr, br, bl);
    }
  }

  square(
    x: number,
    y: number,
    s: number,
    tl: number,
    tr: number,
    br: number,
    bl: number
  ) {
    return this.rect(x, y, s, s, tl, tr, br, bl);
  }

  clearBuff() {
    this.curveBuff = [];
  }

  beginShape() {
    this.clearBuff();
    this.ctx.beginPath();
    this.firstVertex = true;
  }
  beginContour() {
    this.ctx.closePath();
    this.clearBuff();
    this.firstVertex = true;
  }
  endContour() {
    this.clearBuff();
    this.firstVertex = true;
  }

  vertex(x: number | Vector, y: number) {
    this.clearBuff();
    if (this.firstVertex) {
      if (typeof x !== 'number' && x.x && x.y) {
        this.ctx.moveTo(x.x, x.y);
      } else if (typeof x === 'number') {
        this.ctx.moveTo(x, y);
      }
    } else {
      if (typeof x !== 'number' && x.x && x.y) {
        this.ctx.lineTo(x.x, x.y);
      } else if (typeof x === 'number') {
        this.ctx.lineTo(x, y);
      }
    }
    this.firstVertex = false;
  }

  bezierVertex(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ) {
    this.clearBuff();
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }

  quadraticVertex(cp1x: number, cp1y: number, x: number, y: number) {
    this.clearBuff();
    this.ctx.quadraticCurveTo(cp1x, cp1y, x, y);
  }

  bezier(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    this.beginShape();
    this.vertex(x1, y1);
    this.bezierVertex(x2, y2, x3, y3, x4, y4);
    this.endShape();
  }

  triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    this.beginShape();
    this.vertex(x1, y1);
    this.vertex(x2, y2);
    this.vertex(x3, y3);
    this.endShape(this.CLOSE);
  }

  quad(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    this.beginShape();
    this.vertex(x1, y1);
    this.vertex(x2, y2);
    this.vertex(x3, y3);
    this.vertex(x4, y4);
    this.endShape(this.CLOSE);
  }

  endShape(close?: number) {
    this.clearBuff();
    if (close) {
      this.ctx.closePath();
    }
    if (!this._style.noFill) this.ctx.fill();
    if (!this._style.noStroke) this.ctx.stroke();
    if (this._style.noFill && this._style.noStroke) {
      // eh.
      this.ctx.save();
      this.ctx.fillStyle = 'none';
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  catmullRomSpline(
    p0x: number,
    p0y: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    p3x: number,
    p3y: number,
    numPts: number,
    alpha: number
  ) {
    //https://en.wikipedia.org/wiki/Centripetal_Catmull–Rom_spline
    function catmullromSplineGetT(
      t: number,
      p0x: number,
      p0y: number,
      p1x: number,
      p1y: number,
      alpha: number
    ) {
      let a = Math.pow(p1x - p0x, 2.0) + Math.pow(p1y - p0y, 2.0);
      let b = Math.pow(a, alpha * 0.5);
      return b + t;
    }
    let pts = [];

    let t0 = 0.0;
    let t1 = catmullromSplineGetT(t0, p0x, p0y, p1x, p1y, alpha);
    let t2 = catmullromSplineGetT(t1, p1x, p1y, p2x, p2y, alpha);
    let t3 = catmullromSplineGetT(t2, p2x, p2y, p3x, p3y, alpha);

    for (let i = 0; i < numPts; i++) {
      let t = t1 + (i / (numPts - 1)) * (t2 - t1);
      let s = [
        (t1 - t) / (t1 - t0),
        (t - t0) / (t1 - t0),
        (t2 - t) / (t2 - t1),
        (t - t1) / (t2 - t1),
        (t3 - t) / (t3 - t2),
        (t - t2) / (t3 - t2),
        (t2 - t) / (t2 - t0),
        (t - t0) / (t2 - t0),
        (t3 - t) / (t3 - t1),
        (t - t1) / (t3 - t1),
      ];
      for (let j = 0; j < s.length; j += 2) {
        if (isNaN(s[j])) {
          s[j] = 1;
          s[j + 1] = 0;
        }
        if (!isFinite(s[j])) {
          if (s[j] > 0) {
            s[j] = 1;
            s[j + 1] = 0;
          } else {
            s[j] = 0;
            s[j + 1] = 1;
          }
        }
      }
      let a1x = p0x * s[0] + p1x * s[1];
      let a1y = p0y * s[0] + p1y * s[1];
      let a2x = p1x * s[2] + p2x * s[3];
      let a2y = p1y * s[2] + p2y * s[3];
      let a3x = p2x * s[4] + p3x * s[5];
      let a3y = p2y * s[4] + p3y * s[5];
      let b1x = a1x * s[6] + a2x * s[7];
      let b1y = a1y * s[6] + a2y * s[7];
      let b2x = a2x * s[8] + a3x * s[9];
      let b2y = a2y * s[8] + a3y * s[9];
      let cx = b1x * s[2] + b2x * s[3];
      let cy = b1y * s[2] + b2y * s[3];
      pts.push([cx, cy]);
    }
    return pts;
  }

  curveVertex(x: number, y: number) {
    this.curveBuff.push([x, y]);
    if (this.curveBuff.length < 4) {
      return;
    }
    const p0 = this.curveBuff[this.curveBuff.length - 4];
    const p1 = this.curveBuff[this.curveBuff.length - 3];
    const p2 = this.curveBuff[this.curveBuff.length - 2];
    const p3 = this.curveBuff[this.curveBuff.length - 1];
    const pts = this.catmullRomSpline(
      //@ts-expect-errorA spread argument must either have a tuple type or be passed to a rest parameter.
      ...p0,
      ...p1,
      ...p2,
      ...p3,
      this._style.curveDetail,
      this._style.curveAlpha
    );
    for (let i = 0; i < pts.length; i++) {
      if (this.firstVertex) {
        //@ts-expect-errorA spread argument must either have a tuple type or be passed to a rest parameter.
        this.ctx.moveTo(...pts[i]);
      } else {
        //@ts-expect-errorA spread argument must either have a tuple type or be passed to a rest parameter.
        this.ctx.lineTo(...pts[i]);
      }
      this.firstVertex = false;
    }
  }

  curve(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    this.beginShape();
    this.curveVertex(x1, y1);
    this.curveVertex(x2, y2);
    this.curveVertex(x3, y3);
    this.curveVertex(x4, y4);
    this.endShape();
  }

  //================================================================
  // DRAWING MATRIX
  //================================================================
  translate(x: number, y: number) {
    this.ctx.translate(x, y);
  }

  rotate(r: number) {
    this.ctx.rotate(r);
  }

  /**
   *
   * @param {number} x Scaling factor in the horizontal direction. A negative value flips pixels across the vertical axis. A value of 1 results in no horizontal scaling.
   * @param {number} y Scaling factor in the vertical direction. A negative value flips pixels across the horizontal axis. A value of 1 results in no vertical scaling.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
   */
  scale(x: number, y?: number) {
    if (y == undefined) {
      y = x;
    }
    this.ctx.scale(x, y);
  }
  applyMatrix(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.ctx.transform(a, b, c, d, e, f);
  }
  shearX(ang: number) {
    this.ctx.transform(1, 0, Math.tan(ang), 1, 0, 0);
  }
  shearY(ang: number) {
    this.ctx.transform(1, Math.tan(ang), 0, 1, 0, 0);
  }

  resetMatrix() {
    this.ctx.resetTransform();
    this.ctx.scale(this._pixelDensity, this._pixelDensity);
  }

  pushMatrix() {
    this._styleCache.push({ ...this._style });
    this._style = this._styleCache[this._styleCache.length - 1];
    this.ctx.save();
  }

  push() {
    this._styleCache.push({ ...this._style });
    this._style = this._styleCache[this._styleCache.length - 1];
    this.ctx.save();
  }

  popMatrix() {
    if (this._styleCache.length - 1) {
      this._styleCache.pop();
      this._style = this._styleCache[this._styleCache.length - 1];
      this.ctx.restore();
    }
  }

  pop() {
    if (this._styleCache.length - 1) {
      this._styleCache.pop();
      this._style = this._styleCache[this._styleCache.length - 1];
      this.ctx.restore();
    }
  }

  //================================================================
  // IMAGING
  //================================================================
  image(
    //@ts-expect-error img is set to any type
    img: Image,
    dx: number,
    dy: number,
    dWidth?: number,
    dHeight?: number,
    sx?: number,
    sy?: number,
    sWidth?: number,
    sHeight?: number
  ) {
    let drawable = img.MAGIC == this.MAGIC ? img.canvas : img;

    const reset = () => {
      if (img.MAGIC != this.MAGIC || !this._tint) {
        return;
      }
      let c = img.canvas.getContext('2d');
      c.save();
      c.resetTransform();
      c.clearRect(0, 0, c.canvas.width, c.canvas.height);
      c.drawImage(this.tmpCt2.canvas, 0, 0);
      c.restore();
    };
    if (img.MAGIC == this.MAGIC && this._tint != null) {
      this.makeTmpCt2(img.canvas.width, img.canvas.height);
      this.tmpCt2.drawImage(img.canvas, 0, 0);
      img.tinted(this._tint);
    }
    if (!dWidth) {
      if (img.MAGIC == this.MAGIC || img.width) {
        this.ctx.drawImage(drawable, dx, dy, img.width, img.height);
      } else {
        this.ctx.drawImage(drawable, dx, dy, img.videoWidth, img.videoHeight);
      }
      reset();
      return;
    }
    if (!sx && dHeight) {
      this.ctx.drawImage(drawable, dx, dy, dWidth, dHeight);
      reset();
      return;
    }
    if (!sWidth) {
      sWidth = drawable.width;
    }
    if (!sHeight) {
      sHeight = drawable.height;
    }
    if (!sx || !sy || !sWidth || !sHeight || !dHeight) return;
    this.ctx.drawImage(drawable, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    reset();
  }

  loadPixels() {
    this.imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixels = this.imgData.data;
  }

  updatePixels() {
    if (this.imgData != null) {
      this.ctx.putImageData(this.imgData, 0, 0);
    }
  }

  loadImage(url: string, callback?: Function) {
    this.preloadCnt++;
    let g = this.createGraphics(100, 100);
    let c = g.canvas.getContext('2d');
    let img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous';
    if (!c) return;
    img.onload = () => {
      c.canvas.width = img.width;
      c.canvas.height = img.height;
      g.width = img.width;
      g.height = img.height;
      c.drawImage(img, 0, 0);
      this.preloadCnt--;
      if (callback) {
        callback(g);
      }
    };
    return g;
  }

  makeTmpBuf() {
    let l = this.ctx.canvas.width * this.ctx.canvas.height * 4;
    if (this.tmpBuf == null || l != this.tmpBuf.length) {
      this.tmpBuf = new Uint8ClampedArray(l);
    }
  }
  makeTmpCtx(w?: number, h?: number) {
    if (this.tmpCtx == null) {
      this.tmpCtx = document.createElement('canvas').getContext('2d');
      // document.body.appendChild(tmpCtx.canvas)
    }
    if (w == undefined) {
      w = this.ctx.canvas.width;
      h = this.ctx.canvas.height;
    }
    if (this.tmpCtx.canvas.width != w || this.tmpCtx.canvas.height != h) {
      this.tmpCtx.canvas.width = w;
      this.tmpCtx.canvas.height = h;
    }
  }
  makeTmpCt2(w: number, h: number) {
    if (this.tmpCt2 == null) {
      this.tmpCt2 = document.createElement('canvas').getContext('2d');
      // document.body.appendChild(this.tmpCt2.canvas)
    }
    if (w == undefined) {
      w = this.ctx.canvas.width;
      h = this.ctx.canvas.height;
    }
    if (this.tmpCt2.canvas.width != w || this.tmpCt2.canvas.height != h) {
      this.tmpCt2.canvas.width = w;
      this.tmpCt2.canvas.height = h;
    }
  }
  nativeFilter(filtstr: string) {
    this.tmpCtx.clearRect(0, 0, this.tmpCtx.canvas.width, this.tmpCtx.canvas.height);
    this.tmpCtx.filter = filtstr;
    this.tmpCtx.drawImage(this.ctx.canvas, 0, 0);
    this.ctx.save();
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.tmpCtx.canvas, 0, 0);
    this.ctx.restore();
  }
  resize(w: number, h: number) {
    this.makeTmpCtx();
    this.tmpCtx.drawImage(this.ctx.canvas, 0, 0);
    this.width = w;
    this.height = h;
    this.ctx.canvas.width = w * this._pixelDensity;
    this.ctx.canvas.height = h * this._pixelDensity;
    this.ctx.save();
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(
      this.tmpCtx.canvas,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.ctx.restore();
  }

  tinted(color: Color) {
    // let col = color
    let alpha = color._a;
    color!._a = 1;
    this.makeTmpCtx();
    this.tmpCtx.clearRect(0, 0, this.tmpCtx.canvas.width, this.tmpCtx.canvas.height);
    this.tmpCtx.fillStyle = color;
    this.tmpCtx.fillRect(0, 0, this.tmpCtx.canvas.width, this.tmpCtx.canvas.height);
    this.tmpCtx.globalCompositeOperation = 'multiply';
    this.tmpCtx.drawImage(this.ctx.canvas, 0, 0);
    this.tmpCtx.globalCompositeOperation = 'source-over';

    this.ctx.save();
    this.ctx.resetTransform();
    let old = this.ctx.globalCompositeOperation;
    this.ctx.globalCompositeOperation = 'source-in';
    this.ctx.drawImage(this.tmpCtx.canvas, 0, 0);
    this.ctx.globalCompositeOperation = old;
    this.ctx.restore();

    this.tmpCtx.globalAlpha = alpha;
    this.tmpCtx.clearRect(0, 0, this.tmpCtx.canvas.width, this.tmpCtx.canvas.height);
    this.tmpCtx.drawImage(this.ctx.canvas, 0, 0);
    this.tmpCtx.globalAlpha = 1;

    this.ctx.save();
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.tmpCtx.canvas, 0, 0);
    this.ctx.restore();
  }

  tint(color: Color) {
    this._tint = color;
  }

  noTint() {
    this._tint = null;
  }

  mask(img: any) {
    this.ctx.save();
    this.ctx.resetTransform();
    let old = this.ctx.globalCompositeOperation;
    this.ctx.globalCompositeOperation = 'destination-in';
    this.ctx.drawImage(img.canvas, 0, 0);
    this.ctx.globalCompositeOperation = old;
    this.ctx.restore();
  }

  clearTemporaryBuffers() {
    this.tmpCtx = null;
    this.tmpCt2 = null;
    this.tmpBuf = null;
  }

  save(name: string, ext: string) {
    name = name || 'untitled';
    ext = ext || 'png';
    var down = document.createElement('a');
    down.innerHTML = '[Download]';
    const ctx = this.ctx;
    down.addEventListener(
      'click',
      function () {
        this.href = ctx!.canvas.toDataURL();
        this.download = name + '.' + ext;
      },
      false
    );
    document.body.appendChild(down);
    down.click();
    document.body.removeChild(down);
  }

  saveCanvas(sketch: Q5 | string, fileName?: string, ext?: string): void {
    if (sketch instanceof Q5) {
      if (fileName && ext) {
        fileName && ext && sketch.save(fileName, ext);
        return;
      } else if (fileName) {
        let newExt = fileName.split('.');
        sketch.save(newExt.slice(0, -1).join('.'), newExt[newExt.length - 1]);
        return;
      }
    }
    if (typeof sketch !== 'string') return;
    if (fileName) {
      return this.save(sketch, fileName);
    }
    let s = sketch.split('.');
    this.save(s.slice(0, -1).join('.'), s[s.length - 1]);
  }

  //================================================================
  // TYPOGRAPHY
  //================================================================

  loadFont(url: string): string {
    let sp = url.split('/');
    let name = sp[sp.length - 1].split('.')[0].replace(' ', '');
    let cssStr = `@font-face {
        font-family: '${name}';
        src: url('${url}');
      }`;
    const style = document.createElement('style');
    style.textContent = cssStr;
    document.head.append(style);
    return name;
  }

  textFont(x: string) {
    this._style.textFont = x;
  }
  textSize(x: number) {
    this._style.textSize = x;
    this._style.textLeading = x;
  }
  textLeading(x: number) {
    this._style.textLeading = x;
  }
  textStyle(x: string) {
    this._style.textStyle = x;
  }

  textAlign(horiz: CanvasTextAlign, vert?: CanvasTextBaseline) {
    this.ctx.textAlign = horiz;
    if (vert) {
      this.ctx.textBaseline = vert == this.CENTER ? 'middle' : vert;
    }
  }
  text(str: string, x: number, y: number, w?: number) {
    if (!str) {
      return;
    }
    str = str.toString();
    if (this._style.noFill && this._style.noStroke) {
      return;
    }
    this.ctx.font = `${this._style.textStyle} ${this._style.textSize}px ${this._style.textFont}`;
    let lines = str.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!this._style.noFill) {
        this.ctx.fillText(lines[i], x, y, w);
      }
      if (!this._style.noStroke) {
        this.ctx.strokeText(lines[i], x, y, w);
      }
      y += this._style.textLeading;
    }
  }

  textWidth(str: string): number {
    this.ctx.font = `${this._style.textStyle} ${this._style.textSize}px ${this._style.textFont}`;
    return this.ctx.measureText(str).width;
  }

  textAscent(str: string): number {
    this.ctx.font = `${this._style.textStyle} ${this._style.textSize}px ${this._style.textFont}`;
    return this.ctx.measureText(str).actualBoundingBoxAscent;
  }
  textDescent(str: string): number {
    this.ctx.font = `${this._style.textStyle} ${this._style.textSize}px ${this._style.textFont}`;
    return this.ctx.measureText(str).actualBoundingBoxDescent;
  }

  //================================================================
  // RANDOM
  //================================================================

  //https://github.com/processing/p5.js/blob/1.1.9/src/math/noise.js

  noise(x: number, y?: number, z?: number): number {
    y = y || 0;
    z = z || 0;
    if (this.p_perlin == null) {
      this.p_perlin = new Array(this.PERLIN_SIZE + 1);
      for (var i = 0; i < this.PERLIN_SIZE + 1; i++) {
        this.p_perlin[i] = Math.random();
      }
    }
    if (x < 0) {
      x = -x;
    }
    if (y < 0) {
      y = -y;
    }
    if (z < 0) {
      z = -z;
    }
    var xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
    var xf = x - xi;
    var yf = y - yi;
    var zf = z - zi;
    var rxf, ryf;
    var r = 0;
    var ampl = 0.5;
    var n1, n2, n3;
    for (var o = 0; o < this.perlin_octaves; o++) {
      var of = xi + (yi << this.PERLIN_YWRAPB) + (zi << this.PERLIN_ZWRAPB);
      rxf = this.scaled_cosine(xf);
      ryf = this.scaled_cosine(yf);
      n1 = this.p_perlin[of & this.PERLIN_SIZE];
      n1 += rxf * (this.p_perlin[(of + 1) & this.PERLIN_SIZE] - n1);
      n2 = this.p_perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
      n2 += rxf * (this.p_perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);
      of += this.PERLIN_ZWRAP;
      n2 = this.p_perlin[of & this.PERLIN_SIZE];
      n2 += rxf * (this.p_perlin[(of + 1) & this.PERLIN_SIZE] - n2);
      n3 = this.p_perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
      n3 += rxf * (this.p_perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);
      n1 += this.scaled_cosine(zf) * (n2 - n1);
      r += n1 * ampl;
      ampl *= this.perlin_amp_falloff;
      xi <<= 1;
      xf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;
      if (xf >= 1.0) {
        xi++;
        xf--;
      }
      if (yf >= 1.0) {
        yi++;
        yf--;
      }
      if (zf >= 1.0) {
        zi++;
        zf--;
      }
    }
    return r;
  }

  noiseDetail(lod: number, falloff: number) {
    if (lod > 0) {
      this.perlin_octaves = lod;
    }
    if (falloff > 0) {
      this.perlin_amp_falloff = falloff;
    }
  }

  noiseSeed(seed?: number) {
    let jsr = seed == undefined ? Math.random() * 4294967295 : seed;
    if (!this.p_perlin) {
      this.p_perlin = new Float32Array(this.PERLIN_SIZE + 1);
    }
    for (var i = 0; i < this.PERLIN_SIZE + 1; i++) {
      jsr ^= jsr << 17;
      jsr ^= jsr >> 13;
      jsr ^= jsr << 5;
      this.p_perlin[i] = (jsr >>> 0) / 4294967295;
    }
  }
  randomSeed(seed: number) {
    this.rng1.setSeed(seed);
  }

  random(a?: number, b?: number): number {
    if (a == undefined) {
      return this.rng1.rand();
    }
    if (b) {
      return this.rng1.rand() * (b - a) + a;
    } else {
      return this.rng1.rand() * a;
    }
  }

  randomGenerator(method: number) {
    if (method == this.LCG) {
      this.rng1 = new Lcg();
    } else if (method == this.SHR3) {
      this.rng1 = new Shr3();
    }
    this.rng1.setSeed();
  }

  randomGaussian(mean: number, std: number) {
    if (!this.ziggurat.hasInit) {
      this.ziggurat.zigset();
      this.ziggurat.hasInit = true;
    }
    return this.ziggurat.RNOR() * std + mean;
  }

  randomExponential() {
    if (!this.ziggurat.hasInit) {
      this.ziggurat.zigset();
      this.ziggurat.hasInit = true;
    }
    return this.ziggurat.REXP();
  }

  //================================================================
  // ENVIRONMENT
  //================================================================

  cursor(name: string, x?: number, y?: number) {
    let pfx = '';
    if (name.includes('.')) {
      name = `url("${name}")`;
      pfx = ', auto';
    }
    if (x != undefined) {
      name += ' ' + x + ' ' + y;
    }
    this.canvas.style.cursor = name + pfx;
  }

  noCursor() {
    this.canvas.style.cursor = 'none';
  }

  //================================================================
  // DOM
  //================================================================

  // TODO: fix this
  createCapture(x: MediaStreamConstraints) {
    var vid = document.createElement('video');
    vid.playsInline = true;
    vid.autoplay = true;
    navigator.mediaDevices.getUserMedia(x).then(function (stream) {
      vid.srcObject = stream;
    });
    vid.style.position = 'absolute';
    vid.style.opacity = '0.1';
    vid.style.zIndex = '1';
    document.body.appendChild(vid);
    return vid;
  }

  //================================================================
  // EVENTS
  //================================================================

  // FIX THIS

  private _draw() {
    if (!this._noLoop) {
      if (!this._frameRate) {
        this.looper = requestAnimationFrame(() => this._draw());
      } else {
        this.looper = setTimeout(() => this._draw(), 1000 / this._frameRate);
      }
    }
    this.clearBuff();
    this.firstVertex = true;
    this.push();
    this.draw && this.draw();
    this.pop();
    ++this.frameCount;
  }

  noLoop() {
    this._noLoop = true;
    this.looper = null;
  }
  loop() {
    this._noLoop = false;
    if (this.looper == null) {
      this._draw();
    }
  }
  redraw() {
    this._draw();
  }

  frameRate(fps: number) {
    this._frameRate = fps;
  }

  private _start() {
    if (this.preloadCnt > 0) {
      return setTimeout(() => this._start(), 10);
    }
    // ctx.save();
    this.setup && this.setup();
    // ctx.restore();
    this._draw();
  }

  keyIsDown(x: number) {
    return !!this.keysHeld[x];
  }

  getTouchInfo(touch: Touch | null) {
    if (!touch) return;
    const rect = this.canvas.getBoundingClientRect();
    const sx = this.canvas.scrollWidth / this.width || 1;
    const sy = this.canvas.scrollHeight / this.height || 1;
    return {
      x: (touch.clientX - rect.left) / sx,
      y: (touch.clientY - rect.top) / sy,
      id: touch.identifier,
    };
  }

  isTouchAware() {
    return this.touchStarted && this.touchMoved && this.touchEnded;
  }

  requestSensorPermissions() {
    // @ts-expect-error requestPermission does not exists on here
    if (DeviceOrientationEvent.requestPermission) {
      // @ts-expect-error requestPermission does not exists on here
      DeviceOrientationEvent.requestPermission()
        // @ts-expect-error implicit any type
        .then((response) => {
          if (response == 'granted') {
            // @ts-expect-error requestPermission does not exists on here
            if (DeviceMotionEvent.requestPermission) {
              // @ts-expect-error requestPermission does not exists on here
              DeviceMotionEvent.requestPermission()
                // @ts-expect-error implicit any type
                .then((response) => {
                  if (response == 'granted') {
                    this.hasSensorPermission = true;
                  }
                })
                .catch(alert);
            }
          }
        })
        .catch(alert);
    }
  }
}
