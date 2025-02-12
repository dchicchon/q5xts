
type VectorOrNumber = Vector | number;

export class Vector {
    x: number;
    y: number;
    z: number;
    cacheNorm: any;
    cacheNormSq: any;
    constructor(_x: number, _y: number, _z: number) {
      this.x = _x || 0;
      this.y = _y || 0;
      this.z = _z || 0;
      this.cacheNorm = null;
      this.cacheNormSq = null;
    }
  
    // TODO: Very different from previous written confirm if this works
    static arg2v(x: VectorOrNumber, y?: number, z?: number): Vector {
      if (x instanceof Vector) {
        return x;
      }
      if (y != undefined) {
        return new Vector(x, y, z ?? 0);
      }
      return new Vector(x, x, x);
    }
  
    add(x: VectorOrNumber, y?: number, z?: number): Vector {
      const u = Vector.arg2v(x, y, z);
      this.x += u.x;
      this.y += u.y;
      this.z += u.z;
      this.deprecNorm();
      return this;
    }
  
    calcNorm() {
      if (this.cacheNormSq == null) {
        this.cacheNormSq = this.x * this.x + this.y * this.y + this.z * this.z;
        this.cacheNorm = Math.sqrt(this.cacheNormSq);
      }
    }
  
    rem(x: VectorOrNumber, y?: number, z?: number): Vector {
      const u = Vector.arg2v(x, y, z);
      this.x %= u.x;
      this.y %= u.y;
      this.z %= u.z;
      this.deprecNorm();
      return this;
    }
  
    sub(x: VectorOrNumber, y?: number, z?: number): Vector {
      const u = Vector.arg2v(x, y, z);
      this.x -= u.x;
      this.y -= u.y;
      this.z -= u.z;
      this.deprecNorm();
      return this;
    }
  
    mult(x: VectorOrNumber, y?: number, z?: number): Vector {
      const u = Vector.arg2v(x, y, z);
      this.x *= u.x;
      this.y *= u.y;
      this.z *= u.z;
      this.deprecNorm();
      return this;
    }
  
    div(x: VectorOrNumber, y?: number, z?: number): Vector {
      const u = Vector.arg2v(x, y, z);
      this.x /= u.x;
      this.y /= u.y;
      this.z /= u.z;
      this.deprecNorm();
      return this;
    }
  
    mag() {
      this.calcNorm();
      return this.cacheNorm;
    }
  
    magSq() {
      this.calcNorm();
      return this.cacheNormSq;
    }
  
    dot(x: VectorOrNumber, y?: number, z?: number): number {
      const u = Vector.arg2v(x, y, z);
      return this.x * u.x + this.y * u.y + this.z * u.z;
    }
  
    dist(x: VectorOrNumber, y?: number, z?: number): number {
      const u = Vector.arg2v(x, y, z);
      let xDiff = this.x - u.x;
      let yDiff = this.y - u.y;
      let zDiff = this.z - u.z;
      return Math.sqrt(xDiff * xDiff + yDiff * yDiff + zDiff * zDiff);
    }
  
    cross(x: VectorOrNumber, y?: number, z?: number): Vector {
      const u = Vector.arg2v(x, y, z);
      let xCross = this.y * u.z - this.z * u.y;
      let yCross = this.z * u.x - this.x * u.z;
      let zCross = this.x * u.y - this.y * u.x;
      this.x = xCross;
      this.y = yCross;
      this.z = zCross;
      this.deprecNorm();
      return this;
    }
  
    normalize(): Vector {
      this.calcNorm();
      let n = this.cacheNorm;
      this.x /= n;
      this.y /= n;
      this.z /= n;
      this.cacheNorm = 1;
      this.cacheNormSq = 1;
      return this;
    }
  
    limit(m: number): Vector {
      this.calcNorm();
      let n = this.cacheNorm;
      if (n > m) {
        let t = m / n;
        this.x *= t;
        this.y *= t;
        this.z *= t;
        this.cacheNorm = m;
        this.cacheNormSq = m * m;
      }
      return this;
    }
  
    setMag(m: number): Vector {
      this.calcNorm();
      let n = this.cacheNorm;
      let t = m / n;
      this.x *= t;
      this.y *= t;
      this.z *= t;
      this.cacheNorm = m;
      this.cacheNormSq = m * m;
      return this;
    }
  
    heading(): number {
      return Math.atan2(this.y, this.x);
    }
  
    rotate(ang: number): Vector {
      let costh = Math.cos(ang);
      let sinth = Math.sin(ang);
      let vx = this.x * costh - this.y * sinth;
      let vy = this.x * sinth + this.y * costh;
      this.x = vx;
      this.y = vy;
      return this;
    }
  
    angleBetween(x: VectorOrNumber, y?: number, z?: number): number {
      const u = Vector.arg2v(x, y, z);
      const costh = this.dot(u) / (this.mag() * u.mag());
      let ang;
      ang = Math.acos(Math.min(1, Math.max(-1, costh)));
      ang = ang * Math.sign(this.cross(u).z || 1);
      return ang;
    }
  
    lerp(u: Vector, t: number): Vector {
      this.x = this.x * (1 - t) + u.x * t;
      this.y = this.y * (1 - t) + u.y * t;
      this.z = this.z * (1 - t) + u.z * t;
      this.deprecNorm();
      return this;
    }
  
    reflect(n: Vector): Vector {
      n.normalize();
      return this.sub(n.mult(2 * this.dot(n)));
    }
  
    array(): Array<number> {
      return [this.x, this.y, this.z];
    }
  
    equals(u: Vector, epsilon: number): boolean {
      if (epsilon == undefined) {
        epsilon = Number.EPSILON;
        if (epsilon == undefined) {
          epsilon = 0;
        }
      }
      return (
        Math.abs(u.x - this.x) < epsilon &&
        Math.abs(u.y - this.y) < epsilon &&
        Math.abs(u.z - this.z) < epsilon
      );
    }
  
    fromAngle(th: number, l?: number): Vector {
      if (l == undefined) {
        l = 1;
      }
      this.cacheNorm = l;
      this.cacheNormSq = l * l;
      this.x = l * Math.cos(th);
      this.y = l * Math.sin(th);
      this.z = 0;
      return this;
    }
  
    fromAngles(th: number, ph: number, l?: number): Vector {
      if (l == undefined) {
        l = 1;
      }
      this.cacheNorm = l;
      this.cacheNormSq = l * l;
      const cosph = Math.cos(ph);
      const sinph = Math.sin(ph);
      const costh = Math.cos(th);
      const sinth = Math.sin(th);
      this.x = l * sinth * sinph;
      this.y = -l * costh;
      this.z = l * sinth * cosph;
      return this;
    }
    random2D(): Vector {
      this.cacheNorm = 1;
      this.cacheNormSq = 1;
      return this.fromAngle(Math.random() * Math.PI * 2);
    }
    random3D(): Vector {
      this.cacheNorm = 1;
      this.cacheNormSq = 1;
      return this.fromAngles(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
    }
  
    toString(): string {
      return `[${this.x}, ${this.y}, ${this.z}]`;
    }
  
    deprecNorm() {
      this.cacheNormSq = null;
      this.cacheNorm = null;
    }
  
    set(_x: number, _y: number, _z: number) {
      this.x = _x || 0;
      this.y = _y || 0;
      this.z = _z || 0;
    }
  
    copy(): Vector {
      return new Vector(this.x, this.y, this.z);
    }
  }