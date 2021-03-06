import { Point } from './point';

export class Line {
  p1: Point;
  p2: Point;

  /**
   * Define a 2d line between two points
   * @param p1 The first point of the line (This should also be
   * considered the starting point for any laser)
   * @param p2 The second point of the line
   */
  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * Get length of the line
   * @returns Length between the two line points
   */
  get length(): number {
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    return Math.hypot(dx, dy);
  }
}
