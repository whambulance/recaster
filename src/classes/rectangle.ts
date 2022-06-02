import { distanceBetweenPoints, getIntersection, isPointOnLine } from '../functions';
import { RayResolutions, Shape } from '../interfaces';
import { Line } from './line';
import { Point } from './point';

export class Rectangle implements Shape {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;

  lineArray: Line[] = [];

  /**
   * Define a 2d point in space
   * @param x The x-coordinate of the point
   * @param y The y-coordinate of the point
   */
  constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }

  getShapeIntersection(line: Line): Point | null {
    const lines = this.lines;

    interface InterDist {
      intersect: Point;
      distance: number;
    }

    const intersects: InterDist[] = [];

    lines.forEach((shapeLine: Line) => {
      const lineIntersect = getIntersection(line, shapeLine);

      if (lineIntersect) {
        const xEqual = lineIntersect.x.toFixed(3) === line.p1.x.toFixed(3);
        const yEqual = lineIntersect.y.toFixed(3) === line.p1.y.toFixed(3);

        if (!xEqual && !yEqual) {
          intersects.push({
            intersect: lineIntersect,
            distance: distanceBetweenPoints(line.p1, lineIntersect),
          });
        }
      }
    });

    if (!intersects.length) {
      return null;
    }

    const interDist = intersects.reduce((prev: InterDist, curr: InterDist) => {
      return prev.distance < curr.distance ? prev : curr;
    });

    return interDist.intersect;
  }

  getShapeRefraction(rayStart: Point, intersect: Point): Line[] {
    const intersectLine = this.lines.find((line) => {
      return isPointOnLine(intersect, line);
    });
    if (!intersectLine) {
      throw new EvalError('Intersect provided is invalid, no intersection found');
    }

    //
    return [];
  }

  get lines(): Line[] {
    if (!this.lineArray.length) {
      this.lineArray = [
        new Line(this.p1, this.p2),
        new Line(this.p2, this.p3),
        new Line(this.p3, this.p4),
        new Line(this.p4, this.p1),
      ];
    }

    return this.lineArray;
  }

  get points(): Point[] {
    return [this.p1, this.p2, this.p3, this.p4];
  }
}
