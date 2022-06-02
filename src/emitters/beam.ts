import { Emitter } from '../interfaces';
import { BoundsGroup, Line, Point } from '../classes';
import { distanceBetweenPoints, getPerpendicularLine } from '../functions';

export class Beam implements Emitter {
  public firstPoint: Point;
  public secondPoint: Point;
  public density: number = 0.2;

  constructor(firstPoint: Point, secondPoint: Point) {
    if (firstPoint.x === secondPoint.x && firstPoint.y === secondPoint.y) {
      throw new EvalError('Points cannot occupy the same space');
    }
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
  }

  public cast(): Line[] {
    const beamLine = new Line(this.firstPoint, this.secondPoint);
    const lines: Line[] = [];
    const totalDistance = distanceBetweenPoints(this.firstPoint, this.secondPoint);
    const totalLines = totalDistance * this.density;
    const xDelta = (this.secondPoint.x - this.firstPoint.x) / totalLines;
    const yDelta = (this.secondPoint.y - this.firstPoint.y) / totalLines;

    for (let i = 1; i < totalLines; i++) {
      const startPoint = new Point(this.firstPoint.x + i * xDelta, this.firstPoint.y + i * yDelta);

      const perpendicularLine = getPerpendicularLine(beamLine, startPoint);
      lines.push(perpendicularLine);
    }

    return lines;
  }

  public getUnsortedBounds(): BoundsGroup {
    return new BoundsGroup([this.firstPoint.x, this.secondPoint.x], [this.firstPoint.y, this.secondPoint.y]);
  }

  public setDensity(density: number): void {
    if (density < 0 || density > 1) {
      throw new EvalError('Density must be between 0 and 1');
    } else {
      this.density = density;
    }
  }

  get points(): Point[] {
    return [this.firstPoint, this.secondPoint];
  }
}
