import { BoundsGroup, Circle, Line, Point, Triangle } from '../classes';
import { RayResolutions, Receptor } from '../interfaces';
import { extendLineByLength, getRefraction, isPointOnLine } from '../functions';
import { Rectangle } from '../classes/rectangle';

export class Refractor implements Receptor {
  public shape: Rectangle | Circle | Triangle;

  /**
   * Construct a mirror between two points
   * @param mirror The line which the mirror sits on
   */
  constructor(shape: Rectangle | Circle | Triangle) {
    this.shape = shape;
  }

  public testIntersect(ray: Line): Point | null {
    return this.shape.getShapeIntersection(ray);
  }

  public handle(rayStart: Point, intersect: Point): Line[] | RayResolutions.Ended[] {
    const returnArray: Line[] = [];

    if (this.shape instanceof Rectangle) {
      // This code is basically just taking the rays, and looping over the
      // shape to see how many times it can refract / reflect inside it.
      // Needs cleaning up, but seems to work for now
      let initialRefractLine = this.handleRectangle(rayStart, intersect, false);
      const boundsLength = this.getUnsortedBounds().bounds().maxBoundLength();
      initialRefractLine = extendLineByLength(initialRefractLine, boundsLength);

      let newIntersectPoint = this.testIntersect(initialRefractLine);
      let prevIntersectPoint = initialRefractLine.p1;

      if (!newIntersectPoint) {
        returnArray.push(initialRefractLine);
      }

      while (newIntersectPoint) {
        initialRefractLine = new Line(prevIntersectPoint, newIntersectPoint);

        returnArray.push(initialRefractLine);
        let isInternal = false;
        this.shape.lines.forEach((line: Line) => {
          if (isPointOnLine(initialRefractLine.p1, line)) {
            isInternal = true;
          }
        });

        let newLine = this.handleRectangle(initialRefractLine.p1, initialRefractLine.p2, true);

        newLine = extendLineByLength(newLine, boundsLength);
        newIntersectPoint = this.testIntersect(newLine);
        prevIntersectPoint = newLine.p1;

        if (!newIntersectPoint) {
          returnArray.push(newLine);
        }
      }
    } else if (this.shape instanceof Triangle) {
      // handle
    } else if (this.shape instanceof Circle) {
      // handle
    }

    return returnArray;
  }

  private handleRectangle(rayStart: Point, intersect: Point, startInside: boolean): Line {
    if (!(this.shape instanceof Rectangle)) {
      throw new EvalError('Shape is not instance of rectangle');
    }

    let intersectedLine: Line = null as any;

    this.shape.lines.forEach((line: Line) => {
      const startOnLine = isPointOnLine(rayStart, line);
      const intersectOnLine = isPointOnLine(intersect, line);

      if (!startOnLine && intersectOnLine) {
        intersectedLine = line;
      }
    });

    if (!intersectedLine) {
      return new Line(rayStart, intersect);
    }

    const startIndex = startInside ? 1.51 : 1;
    const exitIndex = startInside ? 1 : 1.51;
    const refractedLine = getRefraction(rayStart, intersect, intersectedLine, startIndex, exitIndex);

    return refractedLine;
  }

  public getUnsortedBounds(): BoundsGroup {
    const xArray: number[] = [];
    const yArray: number[] = [];

    if (this.shape instanceof Rectangle || this.shape instanceof Triangle) {
      this.shape.points.forEach((point: Point) => {
        xArray.push(point.x);
        yArray.push(point.y);
      });
    } else if (this.shape instanceof Circle) {
      const radius = this.shape.radius;
      const center = this.shape.center;
      xArray.push(center.x + radius, center.x - radius);
      yArray.push(center.y + radius, center.y - radius);
    }

    return new BoundsGroup(xArray, yArray);
  }

  get points(): Point[] {
    return this.shape.points;
  }
}
