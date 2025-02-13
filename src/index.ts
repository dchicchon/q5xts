import { Vector } from './Vector';
import { Color } from './Color';
import { Lcg, Shr3, Ziggurat } from './Random';
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
interface FilterIml {
  [id: number]: Function;
}
class Q5 {
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
  ctx: CanvasRenderingContext2D | null;
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
  HARDWARE_FILTERS: boolean;

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
  _tint: any;

  private looper: any;
  private firstVertex: boolean;
  private curveBuff: Array<any>;
  private imgData: any;
  private preloadCnt: number;
  private keysHeld: KeysHeld;
  private millisStart: number;
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
  filterImpl: FilterIml;

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
  eventNames: Array<string>;
  parent: HTMLElement

  hasSensorPermission: boolean;

  constructor(scope: 'global' | 'offscreen' | '', elm: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.height = 100;
    this.width = 100;
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.ctx = this.canvas.getContext('2d');
    this.parent = elm
    this.parent.appendChild(this.canvas);
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
    // HINTS
    //================================================================

    this.HARDWARE_FILTERS = true;

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
    this.keyCode = null;
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
    this.millisStart = 0;
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
    this.filterImpl = {};

    this.filterImpl[this.THRESHOLD] = function (data: Array<number>, thresh: number) {
      if (thresh == undefined) {
        thresh = 127.5;
      } else {
        thresh *= 255;
      }
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        data[i] = data[i + 1] = data[i + 2] = gray >= thresh ? 255 : 0;
      }
    };
    this.filterImpl[this.GRAY] = function (data: Array<number>) {
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        data[i] = data[i + 1] = data[i + 2] = gray;
      }
    };
    this.filterImpl[this.OPAQUE] = function (data: Array<number>) {
      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = 255;
      }
    };
    this.filterImpl[this.INVERT] = function (data: Array<number>) {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    };
    this.filterImpl[this.POSTERIZE] = function (data: Array<number>, lvl: number) {
      let lvl1 = lvl - 1;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = (((data[i] * lvl) >> 8) * 255) / lvl1;
        data[i + 1] = (((data[i + 1] * lvl) >> 8) * 255) / lvl1;
        data[i + 2] = (((data[i + 2] * lvl) >> 8) * 255) / lvl1;
      }
    };

    this.filterImpl[this.DILATE] = (data: Array<number>) => {
      this.makeTmpBuf();
      this.tmpBuf.set(data);
      let [w, h] = [this.ctx.canvas.width, this.ctx.canvas.height];
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let l = 4 * Math.max(j - 1, 0);
          let r = 4 * Math.min(j + 1, w - 1);
          let t = 4 * Math.max(i - 1, 0) * w;
          let b = 4 * Math.min(i + 1, h - 1) * w;
          let oi = 4 * i * w;
          let oj = 4 * j;
          for (let k = 0; k < 4; k++) {
            let kt = k + t;
            let kb = k + b;
            let ko = k + oi;
            data[oi + oj + k] = Math.max(
              /*tmpBuf[kt+l],*/ this.tmpBuf[kt + oj] /*this.tmpBuf[kt+r],*/,
              this.tmpBuf[ko + l],
              this.tmpBuf[ko + oj],
              this.tmpBuf[ko + r],
              /*this.tmpBuf[kb+l],*/ this.tmpBuf[kb + oj] /*this.tmpBuf[kb+r],*/
            );
          }
        }
      }
    };

    this.filterImpl[this.ERODE] = (data: Array<number>) => {
      this.makeTmpBuf();
      this.tmpBuf.set(data);
      let [w, h] = [this.ctx.canvas.width, this.ctx.canvas.height];
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let l = 4 * Math.max(j - 1, 0);
          let r = 4 * Math.min(j + 1, w - 1);
          let t = 4 * Math.max(i - 1, 0) * w;
          let b = 4 * Math.min(i + 1, h - 1) * w;
          let oi = 4 * i * w;
          let oj = 4 * j;
          for (let k = 0; k < 4; k++) {
            let kt = k + t;
            let kb = k + b;
            let ko = k + oi;
            data[oi + oj + k] = Math.min(
              /*tmpBuf[kt+l],*/ this.tmpBuf[kt + oj] /*this.tmpBuf[kt+r],*/,
              this.tmpBuf[ko + l],
              this.tmpBuf[ko + oj],
              this.tmpBuf[ko + r],
              /*this.tmpBuf[kb+l],*/ this.tmpBuf[kb + oj] /*this.tmpBuf[kb+r],*/
            );
          }
        }
      }
    };

    this.filterImpl[this.BLUR] = (data: Array<number>, rad: number) => {
      rad = rad || 1;
      rad = Math.floor(rad * this._pixelDensity);
      this.makeTmpBuf();
      this.tmpBuf.set(data);

      let ksize = rad * 2 + 1;

      function gauss1d(ksize: number) {
        let im = new Float32Array(ksize);
        let sigma = 0.3 * rad + 0.8;
        let ss2 = sigma * sigma * 2;
        for (let i = 0; i < ksize; i++) {
          let x = i - ksize / 2;
          let z = Math.exp(-(x * x) / ss2) / (2.5066282746 * sigma);
          im[i] = z;
        }
        return im;
      }

      let kern = gauss1d(ksize);
      let [w, h] = [this.ctx.canvas.width, this.ctx.canvas.height];
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let s0 = 0,
            s1 = 0,
            s2 = 0,
            s3 = 0;
          for (let k = 0; k < ksize; k++) {
            let jk = Math.min(Math.max(j - rad + k, 0), w - 1);
            let idx = 4 * (i * w + jk);
            s0 += this.tmpBuf[idx] * kern[k];
            s1 += this.tmpBuf[idx + 1] * kern[k];
            s2 += this.tmpBuf[idx + 2] * kern[k];
            s3 += this.tmpBuf[idx + 3] * kern[k];
          }
          let idx = 4 * (i * w + j);
          data[idx] = s0;
          data[idx + 1] = s1;
          data[idx + 2] = s2;
          data[idx + 3] = s3;
        }
      }
      this.tmpBuf.set(data);
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let s0 = 0,
            s1 = 0,
            s2 = 0,
            s3 = 0;
          for (let k = 0; k < ksize; k++) {
            let ik = Math.min(Math.max(i - rad + k, 0), h - 1);
            let idx = 4 * (ik * w + j);
            s0 += this.tmpBuf[idx] * kern[k];
            s1 += this.tmpBuf[idx + 1] * kern[k];
            s2 += this.tmpBuf[idx + 2] * kern[k];
            s3 += this.tmpBuf[idx + 3] * kern[k];
          }
          let idx = 4 * (i * w + j);
          data[idx] = s0;
          data[idx + 1] = s1;
          data[idx + 2] = s2;
          data[idx + 3] = s3;
        }
      }
    };

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

    this.eventNames = [
      'setup',
      'draw',
      'preload',
      'mouseMoved',
      'mousePressed',
      'mouseReleased',
      'mouseDragged',
      'mouseClicked',
      'keyPressed',
      'keyReleased',
      'keyTyped',
      'touchStarted',
      'touchEnded',
    ];

    // this.eventNames.forEach(event => {

    // })

    // this is how all the methods are set
    for (let k of this.eventNames) {
      let intern = '_' + k + 'Fn';
      this[intern] = () => {};
      this[intern].isPlaceHolder = true;
      // console.log({ intern, k });
      if (this[k]) {
        this[intern] = this[k];
      } else {
        Object.defineProperty(this, k, {
          set: function (fun) {
            this[intern] = fun;
          },
        });
      }
    }

    setTimeout(() => {
      this._preloadFn();
      this.millisStart = window.performance.now();
      this._start();
    }, 1);

    this.canvas.onmousemove = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;

      if (this.mouseIsPressed) {
        this._mouseDraggedFn(event);
      } else {
        this._mouseMovedFn(event);
      }
    };
    this.canvas.onmousedown = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.mouseIsPressed = true;
      this.mouseButton = [this.LEFT, this.CENTER, this.RIGHT][event.button];
      this._mousePressedFn(event);
    };
    this.canvas.onmouseup = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.mouseIsPressed = false;
      this._mouseReleasedFn(event);
    };
    this.canvas.onclick = (event) => {
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.mouseIsPressed = true;
      this._mouseClickedFn(event);
      this.mouseIsPressed = false;
    };
    window.addEventListener('keydown', (event) => {
      this.keyIsPressed = true;
      this.key = event.key;
      this.keyCode = event.keyCode;
      this.keysHeld[this.keyCode] = true;
      this._keyPressedFn(event);
      if (event.key.length == 1) {
        this._keyTypedFn(event);
      }
    });
    window.addEventListener('keyup', (event) => {
      this.keyIsPressed = false;
      this.key = event.key;
      this.keyCode = event.keyCode;
      this.keysHeld[this.keyCode] = false;
      this._keyReleasedFn(event);
    });

    this.canvas.ontouchstart = (event) => {
      this.touches = event.touches.map(this.getTouchInfo);
      if (this.isTouchUnaware()) {
        this.pmouseX = this.mouseX;
        this.pmouseY = this.mouseY;
        this.mouseX = this.touches[0].x;
        this.mouseY = this.touches[0].y;
        this.mouseIsPressed = true;
        this.mouseButton = this.LEFT;
        if (!this._mousePressedFn(event)) {
          event.preventDefault();
        }
      }
      if (!this._touchStartedFn(event)) {
        event.preventDefault();
      }
    };
    this.canvas.ontouchmove = (event) => {
      this.touches = event.touches.map(this.getTouchInfo);
      if (this.isTouchUnaware()) {
        this.pmouseX = this.mouseX;
        this.pmouseY = this.mouseY;
        this.mouseX = this.touches[0].x;
        this.mouseY = this.touches[0].y;
        this.mouseIsPressed = true;
        this.mouseButton = this.LEFT;
        if (!this._mouseDraggedFn(event)) {
          event.preventDefault();
        }
      }
      if (!this._touchMovedFn(event)) {
        event.preventDefault();
      }
    };

    this.canvas.ontouchend = this.canvas.ontouchcancel = (event) => {
      this.touches = event.touches.map(this.getTouchInfo);
      if (this.isTouchUnaware()) {
        this.pmouseX = this.mouseX;
        this.pmouseY = this.mouseY;
        this.mouseX = this.touches[0].x;
        this.mouseY = this.touches[0].y;
        this.mouseIsPressed = false;
        if (!this._mouseReleasedFn(event)) {
          event.preventDefault();
        }
      }
      if (!this._touchEndedFn(event)) {
        event.preventDefault();
      }
    };

    this.hasSensorPermission =
      (!window.DeviceOrientationEvent && !window.DeviceMotionEvent) ||
      !(DeviceOrientationEvent.requestPermission || DeviceMotionEvent.requestPermission);

    //================================================================
    // SENSORS
    //================================================================

    // 3d transformation helpers
    let ROTX = (a: number) => [
      1,
      0,
      0,
      0,
      0,
      Math.cos(a),
      -Math.sin(a),
      0,
      0,
      Math.sin(a),
      Math.cos(a),
      0,
      0,
      0,
      0,
      1,
    ];
    let ROTY = (a: number) => [
      Math.cos(a),
      0,
      Math.sin(a),
      0,
      0,
      1,
      0,
      0,
      -Math.sin(a),
      0,
      Math.cos(a),
      0,
      0,
      0,
      0,
      1,
    ];
    let MULT = (A, B) => [
      A[0] * B[0] + A[1] * B[4] + A[2] * B[8] + A[3] * B[12],
      A[0] * B[1] + A[1] * B[5] + A[2] * B[9] + A[3] * B[13],
      A[0] * B[2] + A[1] * B[6] + A[2] * B[10] + A[3] * B[14],
      A[0] * B[3] + A[1] * B[7] + A[2] * B[11] + A[3] * B[15],
      A[4] * B[0] + A[5] * B[4] + A[6] * B[8] + A[7] * B[12],
      A[4] * B[1] + A[5] * B[5] + A[6] * B[9] + A[7] * B[13],
      A[4] * B[2] + A[5] * B[6] + A[6] * B[10] + A[7] * B[14],
      A[4] * B[3] + A[5] * B[7] + A[6] * B[11] + A[7] * B[15],
      A[8] * B[0] + A[9] * B[4] + A[10] * B[8] + A[11] * B[12],
      A[8] * B[1] + A[9] * B[5] + A[10] * B[9] + A[11] * B[13],
      A[8] * B[2] + A[9] * B[6] + A[10] * B[10] + A[11] * B[14],
      A[8] * B[3] + A[9] * B[7] + A[10] * B[11] + A[11] * B[15],
      A[12] * B[0] + A[13] * B[4] + A[14] * B[8] + A[15] * B[12],
      A[12] * B[1] + A[13] * B[5] + A[14] * B[9] + A[15] * B[13],
      A[12] * B[2] + A[13] * B[6] + A[14] * B[10] + A[15] * B[14],
      A[12] * B[3] + A[13] * B[7] + A[14] * B[11] + A[15] * B[15],
    ];
    let TRFM = (A, v) => [
      (A[0] * v[0] + A[1] * v[1] + A[2] * v[2] + A[3]) /
        (A[12] * v[0] + A[13] * v[1] + A[14] * v[2] + A[15]),
      (A[4] * v[0] + A[5] * v[1] + A[6] * v[2] + A[7]) /
        (A[12] * v[0] + A[13] * v[1] + A[14] * v[2] + A[15]),
      (A[8] * v[0] + A[9] * v[1] + A[10] * v[2] + A[11]) /
        (A[12] * v[0] + A[13] * v[1] + A[14] * v[2] + A[15]),
    ];

    window.ondeviceorientation = (event) => {
      this.pRotationX = this.rotationX;
      this.pRotationY = this.rotationY;
      this.pRotationZ = this.rotationZ;
      this.pRelRotationX = this.relRotationX;
      this.pRelRotationY = this.relRotationY;
      this.pRelRotationZ = this.relRotationZ;

      this.rotationX = event.beta * (Math.PI / 180.0);
      this.rotationY = event.gamma * (Math.PI / 180.0);
      this.rotationZ = event.alpha * (Math.PI / 180.0);
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
        this.accelerationX = event.accelerationIncludingGravity.x + grav[0];
        this.accelerationY = event.accelerationIncludingGravity.y + grav[1];
        this.accelerationZ = event.accelerationIncludingGravity.z - grav[2];
      }
    };
  }

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

  // hint(prop: string, val) {
  //   this[prop] = val;
  // }

  dispose() {
    if (this.canvas && this.parent) {
      this.parent.removeChild(this.canvas);
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

  lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t;
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
  createVector(x: number, y: number, z?: number) {
    return new Vector(x, y, z);
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

  color(r: Color | number, g: number, b: number, a: number): Color | null {
    if (arguments.length === 1 && r instanceof Color) {
      return r;
    }
    if (r instanceof Color) return null;
    if (this._style.colorMode === this.RGB) {
      if (arguments.length === 1) {
        return new Color(r, r, r, 1);
      } else if (arguments.length === 2) {
        return new Color(r, r, r, g / 255);
      } else if (arguments.length === 3) {
        return new Color(r, g, b, 1);
      } else if (arguments.length === 4) {
        return new Color(r, g, b, a / 255);
      }
    } else {
      if (arguments.length == 1) {
        const vals = Color.hsv2rgb(0, 0, r / 100);
        return new Color(...vals);
      } else if (arguments.length === 2) {
        const vals = Color.hsv2rgb(0, 0, r / 100);
        return new Color(...vals);
      } else if (arguments.length === 3) {
        const vals = Color.hsv2rgb(r, g / 100, b / 100);
        return new Color(...vals);
      } else if (arguments.length === 4) {
        const vals = Color.hsv2rgb(r, g / 100, b / 100);
        return new Color(...vals);
      }
    }
    return null;
  }
  red(c: Color) {
    return c._r;
  }
  green(c: Color) {
    return c._g;
  }
  blue(c: Color) {
    return c._b;
  }
  alpha(c: Color) {
    return c._a * 255;
  }

  hue(c: Color) {
    c._inferHSV();
    return c._h;
  }
  saturation(c: Color) {
    c._inferHSV();
    return c._s;
  }
  brightness(c: Color) {
    c._inferHSV();
    return c._v;
  }
  lightness(c: Color) {
    return ((0.2126 * c._r + 0.7152 * c._g + 0.0722 * c._b) * 100) / 255;
  }

  lerpColor(a: Color, b: Color, t: number) {
    if (this._style.colorMode == this.RGB) {
      return new Color(
        this.constrain(this.lerp(a._r, b._r, t), 0, 255),
        this.constrain(this.lerp(a._g, b._g, t), 0, 255),
        this.constrain(this.lerp(a._b, b._b, t), 0, 255),
        this.constrain(this.lerp(a._a, b._a, t), 0, 1)
      );
    } else {
      a._inferHSV();
      b._inferHSV();
      return new Color(
        this.constrain(this.lerpHue(a._h, b._h, t), 0, 360),
        this.constrain(this.lerp(a._s, b._s, t), 0, 100),
        this.constrain(this.lerp(a._v, b._v, t), 0, 100),
        this.constrain(this.lerp(a._a, b._a, t), 0, 1)
      );
    }
  }
  strokeWeight(n: number) {
    this._style.noStroke = false;
    this.ctx.lineWidth = n;
  }

  stroke() {
    this._style.noStroke = false;
    if (typeof arguments[0] == 'string') {
      this.ctx.strokeStyle = arguments[0];
      return;
    }
    const col = this.color(...arguments);
    if (col._a <= 0) {
      this._style.noStroke = true;
      return;
    }
    this.ctx.strokeStyle = col;
  }

  noStroke() {
    this._style.noStroke = true;
  }

  fill(...args) {
    this._style.noFill = false;
    if (typeof args[0] == 'string') {
      this.ctx.fillStyle = args[0];
      return;
    }
    const col = this.color(...args);
    if (col._a <= 0) {
      this._style.noFill = true;
      return;
    }
    this.ctx.fillStyle = col;
  }

  noFill() {
    this._style.noFill = true;
  }

  blendMode(x: GlobalCompositeOperation) {
    this.ctx.globalCompositeOperation = x;
  }

  strokeCap(x: CanvasLineCap) {
    this.ctx.lineCap = x;
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

  background(...args) {
    if (arguments[0] && arguments[0].MAGIC == this.MAGIC) {
      return this.image(arguments[0], 0, 0, this.width, this.height);
    }
    this.ctx.save();
    this.ctx.resetTransform();
    this.ctx.scale(this._pixelDensity, this._pixelDensity);
    if (typeof arguments[0] == 'string') {
      this.ctx.fillStyle = arguments[0];
    } else {
      this.ctx.fillStyle = this.color(...arguments);
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
    mode: number,
    detail: number
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
    } else if (this._style.ellipseMode == this.RADIUS) {
      this.arcImpl(x, y, w * 2, h * 2, start, stop, mode, detail);
    } else if (this._style.ellipseMode == this.CORNER) {
      this.arcImpl(x + w / 2, y + h / 2, w, h, start, stop, mode, detail);
    } else if (this._style.ellipseMode == this.CORNERS) {
      this.arcImpl((x + w) / 2, (y + h) / 2, w - x, h - y, start, stop, mode, detail);
    }
  }

  ellipseImpl(x, y, w, h) {
    if (this._style.noFill && this._style.noStroke) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
    if (!this._style.noFill) this.ctx.fill();
    if (!this._style.noStroke) this.ctx.stroke();
  }

  ellipse(x, y, w, h) {
    if (h == undefined) {
      h = w;
    }
    if (this._style.ellipseMode == this.CENTER) {
      this.ellipseImpl(x, y, w, h);
    } else if (this._style.ellipseMode == this.RADIUS) {
      this.ellipseImpl(x, y, w * 2, h * 2);
    } else if (this._style.ellipseMode == this.CORNER) {
      this.ellipseImpl(x + w / 2, y + h / 2, w, h);
    } else if (this._style.ellipseMode == this.CORNERS) {
      this.ellipseImpl((x + w) / 2, (y + h) / 2, w - x, h - y);
    }
  }

  circle(x: number, y: number, r: number) {
    return this.ellipse(x, y, r, r);
  }

  point(x: Vector | number, y?: number) {
    if (x instanceof Vector) {
      y = x.y;
      x = x.x;
    }
    if (!y) return;
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
    bl = Math.min(hh, bl);
    br = Math.min(hh, br);
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

  rect(
    x: number,
    y: number,
    w: number,
    h: number,
    tl?: number,
    tr?: number,
    br?: number,
    bl?: number
  ) {
    if (this._style.rectMode == this.CENTER) {
      this.roundedRectImpl(x - w / 2, y - h / 2, w, h, tl, tr, br, bl);
    } else if (this._style.rectMode == this.RADIUS) {
      this.roundedRectImpl(x - w, y - h, w * 2, h * 2, tl, tr, br, bl);
    } else if (this._style.rectMode == this.CORNER) {
      this.roundedRectImpl(x, y, w, h, tl, tr, br, bl);
    } else if (this._style.rectMode == this.CORNERS) {
      this.roundedRectImpl(x, y, w - x, h - y, tl, tr, br, bl);
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
  vertex(x: number, y: number) {
    this.clearBuff();
    if (this.firstVertex) {
      this.ctx.moveTo(x, y);
    } else {
      this.ctx.lineTo(x, y);
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
      ...p0,
      ...p1,
      ...p2,
      ...p3,
      this._style.curveDetail,
      this._style.curveAlpha
    );
    for (let i = 0; i < pts.length; i++) {
      if (this.firstVertex) {
        this.ctx.moveTo(...pts[i]);
      } else {
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
    img,
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

  loadImage(url: string, callback: Function) {
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

  filter(typ: number, x: number) {
    let support = this.HARDWARE_FILTERS && this.ctx.filter != undefined;
    if (support) {
      this.makeTmpCtx();
      if (typ == this.THRESHOLD) {
        if (x == undefined) {
          x = 0.5;
        }
        x = Math.max(x, 0.00001);
        let b = Math.floor((0.5 / x) * 100);
        this.nativeFilter(`saturate(0%) brightnessthis{b}%) contrast(1000000%)`);
      } else if (typ == this.GRAY) {
        this.nativeFilter(`saturate(0%)`);
      } else if (typ == this.OPAQUE) {
        this.tmpCtx.fillStyle = 'black';
        this.tmpCtx.fillRect(0, 0, this.tmpCtx.canvas.width, this.tmpCtx.canvas.height);
        this.tmpCtx.drawImage(this.ctx.canvas, 0, 0);
        this.ctx.save();
        this.ctx.resetTransform();
        this.ctx.drawImage(this.tmpCtx.canvas, 0, 0);
        this.ctx.restore();
      } else if (typ == this.INVERT) {
        this.nativeFilter(`invert(100%)`);
      } else if (typ == this.BLUR) {
        this.nativeFilter(`blur${Math.ceil((x * this._pixelDensity) / 1) || 1}px)`);
      } else {
        let imgData = this.ctx.getImageData(
          0,
          0,
          this.ctx.canvas.width,
          this.ctx.canvas.height
        );
        this.filterImpl[typ](imgData.data, x);
        this.ctx.putImageData(imgData, 0, 0);
      }
    } else {
      let imgData = this.ctx.getImageData(
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      );
      this.filterImpl[typ](imgData.data, x);
      this.ctx.putImageData(imgData, 0, 0);
    }
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

  get(x: number, y: number, w?: number, h?: number) {
    if (x != undefined && w == undefined) {
      let c = this.ctx.getImageData(x, y, 1, 1).data;
      return new Color(c[0], c[1], c[2], c[3] / 255);
    }
    x = x || 0;
    y = y || 0;
    w = w || this.width;
    h = h || this.height;
    let g = this.createGraphics(w, h);
    g.pixelDensity(this._pixelDensity);
    let imgData = this.ctx.getImageData(
      x * this._pixelDensity,
      y * this._pixelDensity,
      w * this._pixelDensity,
      h * this._pixelDensity
    );
    g.canvas.getContext('2d').putImageData(imgData, 0, 0);
    return g;
  }

  set(x: number, y: number, c) {
    if (c.MAGIC == this.MAGIC) {
      let old = this._tint;
      this._tint = null;
      this.image(c, x, y);
      this._tint = old;
      return;
    }
    let idx =
      4 * (y * this._pixelDensity * this.ctx.canvas.width + x * this._pixelDensity);
    this.pixels[idx] = c._r;
    this.pixels[idx + 1] = c._g;
    this.pixels[idx + 2] = c._b;
    this.pixels[idx + 3] = c._a * 255;
  }

  tinted() {
    let col = this.color(...arguments);
    let alpha = col._a;
    col._a = 1;
    this.makeTmpCtx();
    this.tmpCtx.clearRect(0, 0, this.tmpCtx.canvas.width, this.tmpCtx.canvas.height);
    this.tmpCtx.fillStyle = col;
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

  tint() {
    this._tint = this.color(...arguments);
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
    down.addEventListener(
      'click',
      function () {
        this.href = this.ctx.canvas.toDataURL();
        this.download = name + '.' + ext;
      },
      false
    );
    document.body.appendChild(down);
    down.click();
    document.body.removeChild(down);
  }

  saveCanvas(a, b?, c?) {
    // TODO: Figure out better methodology of checking type?
    if (a.MAGIC == this.MAGIC) {
      if (c) {
        a.save(b, c);
      }
      let s = b.split('.');
      return a.save(s.slice(0, -1).join('.'), s[s.length - 1]);
    }
    if (b) {
      return this.save(a, b);
    }
    let s = a.split('.');
    return this.save(s.slice(0, -1).join('.'), s[s.length - 1]);
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
  text(str: string, x: number, y: number, w: number) {
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

  random(a?: number | string, b?: number) {
    if (a == undefined) {
      return this.rng1.rand();
    }
    if (typeof a == 'number') {
      if (b) {
        return this.rng1.rand() * (b - a) + a;
      } else {
        return this.rng1.rand() * a;
      }
    } else {
      return a[~~(a.length * this.rng1.rand())];
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

  print() {
    return console.log;
  }

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
  createCapture(x) {
    var vid = document.createElement('video');
    vid.playsinline = 'playsinline';
    vid.autoplay = 'autoplay';
    navigator.mediaDevices.getUserMedia(x).then(function (stream) {
      vid.srcObject = stream;
    });
    vid.style.position = 'absolute';
    vid.style.opacity = 0.00001;
    vid.style.zIndex = -1000;
    document.body.appendChild(vid);
    return vid;
  }

  //================================================================
  // EVENTS
  //================================================================

  // FIX THIS
  _draw() {
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
    this._drawFn();
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

  _start() {
    if (this.preloadCnt > 0) {
      return setTimeout(() => this._start(), 10);
    }
    // ctx.save();
    this._setupFn();
    // ctx.restore();
    this._draw();
  }

  keyIsDown(x: number) {
    return !!this.keysHeld[x];
  }

  getTouchInfo(touch) {
    const rect = this.canvas.getBoundingClientRect();
    const sx = this.canvas.scrollWidth / this.width || 1;
    const sy = this.canvas.scrollHeight / this.height || 1;
    return {
      x: (touch.clientX - rect.left) / sx,
      y: (touch.clientY - rect.top) / sy,
      id: touch.identifier,
    };
  }

  isTouchUnaware() {
    return (
      this._touchStarted.isPlaceHolder &&
      this._touchMoved.isPlaceHolder &&
      this._touchEnded.isPlaceHolder
    );
  }

  requestSensorPermissions() {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response == 'granted') {
            if (DeviceMotionEvent.requestPermission) {
              DeviceMotionEvent.requestPermission()
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

  //================================================================
  // TIME
  //================================================================

  year() {
    return new Date().getFullYear();
  }
  day() {
    return new Date().getDay();
  }
  hour() {
    return new Date().getHours();
  }
  minute() {
    return new Date().getMinutes();
  }
  second() {
    return new Date().getSeconds();
  }
  millis() {
    return window.performance.now() - this.millisStart;
  }
}

export default Q5;
