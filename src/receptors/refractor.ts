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
      let line = this.handleRectangle(rayStart, intersect)
      let boundsLength = this.getUnsortedBounds().bounds().maxBoundLength();
      let extendedLine = extendLineByLength(line, boundsLength);
      console.log('extendedLine', extendedLine)
      let newIntersectPoint = this.testIntersect(extendedLine)
      console.log('newIntersectPoint', newIntersectPoint)

      if (newIntersectPoint) {
        let internalLine = new Line(extendedLine.p1, newIntersectPoint)
        returnArray.push(internalLine)
        let extenalLine = this.handleRectangle(internalLine.p1, internalLine.p2)
        returnArray.push(extenalLine);
      } else {
        returnArray.push(extendedLine)
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
    let startOnEdge: Boolean = false;
    let startInShape: Boolean = isPointInRectangle(rayStart, this.shape)

    this.shape.lines.forEach((line: Line) => {
      const startOnLine = isPointOnLine(rayStart, line);
      const intersectOnLine = isPointOnLine(intersect, line);

      if (!startOnLine && intersectOnLine) {
        intersectedLine = line;
      }
      if (isPointOnLine(rayStart, line)) {
        startOnEdge = true
      }
    })

    if (!intersectedLine) {
      throw new EvalError('Point provided does not intersect shapes edge')
    }
    
    let refractionIndex = startOnEdge || startInShape ? 1 / 1.51 : 1.51;
    // let refractionIndex = 1.51
    console.log('refractionindex', refractionIndex)
    const refractedLine = getRefraction(rayStart, intersect, refractionIndex, intersectedLine);

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
