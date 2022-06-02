import { distanceBetweenPoints, getCircleIntersection, getIntersection } from '../functions';
import { Shape } from '../interfaces';
import { Line } from './line';
import { Point } from './point';

export class Circle implements Shape {
  public center: Point;
  public edge: Point;
  private radiusValue: number | null = null;

  /**
   * Define a 2d Circle in space
   * @param center The center point for the circle
   * @param edge A point which intersects the edge of the circle
   */
  constructor(center: Point, edge: Point) {
    this.center = center;
    this.edge = edge;
  }

  getShapeIntersection(line: Line): Point | null {
    const intersects = getCircleIntersection(line, this.center, this.radius);

    if (intersects && intersects.length > 1) {
      const distance1 = distanceBetweenPoints(line.p1, intersects[0]);
      const distance2 = distanceBetweenPoints(line.p1, intersects[1]);

      return distance1 < distance2 ? intersects[0] : intersects[1];
    } else if (intersects && intersects.length) {
      return intersects[0];
    } else {
      return null;
    }
  }

  get radius(): number {
    if (this.radiusValue === null) {
      this.radiusValue = distanceBetweenPoints(this.center, this.edge);
    }

    return this.radiusValue ? this.radiusValue : 0;
  }

  get lines(): Line[] {
    return [];
  }

  get points(): Point[] {
    return [this.center, this.edge];
  }
}
