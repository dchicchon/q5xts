
export class Color {
    MAGIC: number;
    _r: number;
    _g: number;
    _b: number;
    _a: number;
    _h: number;
    _s: number;
    _v: number;
    _hsvInferred: boolean;
  
    constructor(r: number, g: number, b: number, a: number) {
      this.MAGIC = 0xc010a;
      this._r = r;
      this._g = g;
      this._b = b;
      this._a = a;
      this._h = 0;
      this._s = 0;
      this._v = 0;
      this._hsvInferred = false;
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
  
    setRed(x: number) {
      this._r = x;
      this._hsvInferred = false;
    }
    setGreen(x: number) {
      this._g = x;
      this._hsvInferred = false;
    }
    setBlue(x: number) {
      this._b = x;
      this._hsvInferred = false;
    }
    setAlpha(x: number) {
      this._a = x / 255;
      this._hsvInferred = false;
    }
    _inferHSV() {
      if (!this._hsvInferred) {
        [this._h, this._s, this._v] = Color.rgb2hsv(this._r, this._g, this._b);
        this._hsvInferred = true;
      }
    }
    toString(): string {
      return `rgba(${Math.round(this._r)},${Math.round(this._g)},${Math.round(this._b)},${
        ~~(this._a * 1000) / 1000
      })`;
    }
  }