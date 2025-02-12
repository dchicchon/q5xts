export class Lcg {
  m: number;
  a: number;
  c: number;
  z: any;
  seed: any;
  constructor() {
    this.m = 4294967296;
    this.a = 1664525;
    this.c = 1013904223;
    this.seed = null;
    this.z = null;
  }
  setSeed(val?: number) {
    this.z = this.seed = (val == null ? Math.random() * this.m : val) >>> 0;
  }
  getSeed(): number {
    return this.seed;
  }
  rand(): number {
    this.z = (this.a * this.z + this.c) % this.m;
    return this.z / this.m;
  }
}
export class Shr3 {
  m: number;
  seed: any;
  jsr: any;
  constructor() {
    this.m = 4294967295;
    this.jsr = null;
    this.seed = null;
  }
  setSeed(val?: number) {
    this.jsr = this.seed = (val == null ? Math.random() * this.m : val) >>> 0;
  }

  getSeed() {
    return this.seed;
  }
  rand() {
    this.jsr ^= this.jsr << 17;
    this.jsr ^= this.jsr >> 13;
    this.jsr ^= this.jsr << 5;
    return (this.jsr >>> 0) / this.m;
  }
}
export class Ziggurat {
  //http://ziggurat.glitch.me/
  rng1: any;
  iz: any;
  jz: any;
  kn: Array<any>;
  ke: Array<any>;
  hz: any;
  wn: Array<any>;
  fn: Array<any>;
  we: Array<any>;
  fe: Array<any>;
  hasInit: boolean;

  constructor(rng1: Lcg | Shr3) {
    this.rng1 = rng1;
    this.iz = null;
    this.jz = null;
    this.kn = new Array(128);
    this.ke = new Array(256);
    this.hz;
    this.wn = new Array(128);
    this.fn = new Array(128);
    this.we = new Array(256);
    this.fe = new Array(256);
    this.hasInit = false;
  }

  SHR3() {
    return this.rng1.rand() * 4294967296 - 2147483648;
  }
  UNI() {
    return 0.5 + (this.SHR3() << 0) * 0.2328306e-9;
  }

  RNOR() {
    this.hz = this.SHR3();
    this.iz = this.hz & 127;
    return Math.abs(this.hz) < this.kn[this.iz]
      ? this.hz * this.wn[this.iz]
      : this.nfix();
  }
  REXP() {
    this.jz = this.SHR3() >>> 0;
    this.iz = this.jz & 255;
    return this.jz < this.kn[this.iz] ? this.jz * this.we[this.iz] : this.efix();
  }
  nfix() {
    var r = 3.44262;
    var x, y;
    var u1, u2;
    for (;;) {
      x = this.hz * this.wn[this.iz];
      if (this.iz == 0) {
        do {
          u1 = this.UNI();
          u2 = this.UNI();
          x = -Math.log(u1) * 0.2904764;
          y = -Math.log(u2);
        } while (y + y < x * x);
        return this.hz > 0 ? r + x : -r - x;
      }

      if (
        this.fn[this.iz] + this.UNI() * (this.fn[this.iz - 1] - this.fn[this.iz]) <
        Math.exp(-0.5 * x * x)
      ) {
        return x;
      }
      this.hz = this.SHR3();
      this.iz = this.hz & 127;
      if (Math.abs(this.hz) < this.kn[this.iz]) {
        return this.hz * this.wn[this.iz];
      }
    }
  }

  efix() {
    var x;
    for (;;) {
      if (this.iz == 0) {
        return 7.69711 - Math.log(this.UNI());
      }
      x = this.jz * this.we[this.iz];
      if (
        this.fe[this.iz] + this.UNI() * (this.fe[this.iz - 1] - this.fe[this.iz]) <
        Math.exp(-x)
      ) {
        return x;
      }
      this.jz = this.SHR3();
      this.iz = this.jz & 255;
      if (this.jz < this.ke[this.iz]) {
        return this.jz * this.we[this.iz];
      }
    }
  }

  zigset() {
    var m1 = 2147483648;
    var m2 = 4294967296;
    var dn = 3.442619855899;
    var tn = dn;
    var vn = 9.91256303526217e-3;
    var q;
    var de = 7.697117470131487;
    var te = de;
    var ve = 3.949659822581572e-3;
    var i;

    /* Tables for RNOR */
    q = vn / Math.exp(-0.5 * dn * dn);
    this.kn[0] = Math.floor((dn / q) * m1);
    this.kn[1] = 0;
    this.wn[0] = q / m1;
    this.wn[127] = dn / m1;
    this.fn[0] = 1;
    this.fn[127] = Math.exp(-0.5 * dn * dn);
    for (i = 126; i >= 1; i--) {
      dn = Math.sqrt(-2 * Math.log(vn / dn + Math.exp(-0.5 * dn * dn)));
      this.kn[i + 1] = Math.floor((dn / tn) * m1);
      tn = dn;
      this.fn[i] = Math.exp(-0.5 * dn * dn);
      this.wn[i] = dn / m1;
    }
    /*Tables for REXP */
    q = ve / Math.exp(-de);
    this.ke[0] = Math.floor((de / q) * m2);
    this.ke[1] = 0;
    this.we[0] = q / m2;
    this.we[255] = de / m2;
    this.fe[0] = 1;
    this.fe[255] = Math.exp(-de);
    for (i = 254; i >= 1; i--) {
      de = -Math.log(ve / de + Math.exp(-de));
      this.ke[i + 1] = Math.floor((de / te) * m2);
      te = de;
      this.fe[i] = Math.exp(-de);
      this.we[i] = de / m2;
    }
  }
}
