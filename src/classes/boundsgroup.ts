import { Bounds } from './bounds';

export class BoundsGroup {
  x: number[] = [];
  y: number[] = [];

  constructor(xList: number[] = [], yList: number[] = []) {
    this.x.push(...xList);
    this.y.push(...yList);
  }

  private numberCompare(a: number, b: number): number {
    return a - b;
  }

  public bounds(): Bounds {
    const timsort = require('timsort');

    timsort.sort(this.x, this.numberCompare);
    timsort.sort(this.y, this.numberCompare);

    return new Bounds(this.x[0], this.x[this.x.length - 1], this.y[0], this.y[this.y.length - 1]);
  }
}
