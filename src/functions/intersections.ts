import Decimal from 'decimal.js';
import { Line, Point, Vector } from '../classes';

/**
 * Find the orientation of an ordered triplet (p, q, r)
 *
 * @param p First ordered point
 * @param q Second ordered point
 * @param r Third ordered point
 * @returns 0 --> p, q, and r are collinear
 * @returns 1 --> points are clockwise
 * @returns 2 --> points are counter-clockwise
 */
export function pointOrientation(p: Point, q: Point, r: Point): 0 | 1 | 2 {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val === 0) return 0; // collinear

  return val > 0 ? 1 : 2; // clock or counterclock wise
}

export function doLinesIntersect(line1: Line, line2: Line): boolean {
  const o1 = pointOrientation(line1.p1, line1.p2, line2.p1);
  const o2 = pointOrientation(line1.p1, line1.p2, line2.p2);
  const o3 = pointOrientation(line2.p1, line2.p2, line1.p1);
  const o4 = pointOrientation(line2.p1, line2.p2, line1.p2);

  // General case
  if (o1 !== o2 && o3 !== o4) return true;

  return false;
}

/**
 * Calculates the determinant value for two points, given a 2x2 matrix,
 *
 * @param point1 First point
 * @param point2 Second point
 * @returns Determinant number
 */
export function calcDet(point1: Point, point2: Point): number {
  const num1 = new Decimal(point1.x).times(point2.y);
  const num2 = new Decimal(point1.y).times(point2.x);
  return num1.minus(num2).toNumber();
}

/**
 * Calculates if two lines intersect, and returns the intersection point
 * if they do. Otherwise, returns null
 *
 * @param line1 First line
 * @param line2 Second line
 * @returns Point of intersection | Null if no intersection point
 */
export function getIntersection(line1: Line, line2: Line): Point | null {
  const linesIntersect = doLinesIntersect(line1, line2);

  if (!linesIntersect) {
    return null;
  }

  const xdiff = new Point(
    new Decimal(line1.p1.x).minus(line1.p2.x).toNumber(),
    new Decimal(line2.p1.x).minus(line2.p2.x).toNumber(),
  );
  const ydiff = new Point(
    new Decimal(line1.p1.y).minus(line1.p2.y).toNumber(),
    new Decimal(line2.p1.y).minus(line2.p2.y).toNumber(),
  );

  const div = calcDet(xdiff, ydiff);

  const d = new Point(calcDet(line1.p1, line1.p2), calcDet(line2.p1, line2.p2));
  const x: number = new Decimal(calcDet(d, xdiff)).dividedBy(div).toDecimalPlaces(12).toNumber();
  const y: number = new Decimal(calcDet(d, ydiff)).dividedBy(div).toDecimalPlaces(12).toNumber();
  const intersectionPoint = new Point(x, y);

  return intersectionPoint;
}

/**
 * Test if an incoming line intersects a given circle. If it does, return the
 * intersection points, otherwise return null
 *
 * @param line The incoming line to test intersection with
 * @param center The center of the circle to intersect
 * @param radius The radius of the circle being intersected
 */
export function getCircleIntersection(line: Line, center: Point, radius: number): Point[] | null {
  const dx = line.p2.x - line.p1.x;
  const dy = line.p2.y - line.p1.y;

  const lineLength = line.length;
  const ux = dx / lineLength;
  const uy = dy / lineLength;

  const cu = (center.x - line.p1.x) * ux + (center.y - line.p1.y) * uy;
  const px = line.p1.x + cu * ux;
  const py = line.p1.y + cu * uy;

  const discriminant = Math.sqrt(
    radius * radius - (px - center.x) * (px - center.x) - (py - center.y) * (py - center.y),
  );

  if (isNaN(discriminant)) {
    return null;
  }

  const point1 = new Point(px + ux * discriminant, py + uy * discriminant);
  const point2 = new Point(px - ux * discriminant, py - uy * discriminant);
  const intersectPoints = [point1];

  if (JSON.stringify(point1) !== JSON.stringify(point2)) {
    intersectPoints.push(point2);
  }

  return intersectPoints;
}
