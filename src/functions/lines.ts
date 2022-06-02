import Decimal from 'decimal.js';
import { Line, Point } from '../classes';
import { distanceBetweenPoints } from './points';

/**
 * Extend a line by a given value
 *
 * @param line The line to be extended
 * @param extension How far to extend the line
 */
export function extendLineByLength(line: Line, extension: number): Line {
  const lineLength = line.length;
  const newX = new Decimal(line.p2.x).minus(line.p1.x).dividedBy(lineLength).times(extension).add(line.p2.x);
  const newY = new Decimal(line.p2.y).minus(line.p1.y).dividedBy(lineLength).times(extension).add(line.p2.y);

  return new Line(line.p1, new Point(newX.toNumber(), newY.toNumber()));
}

/**
 * Return a line perpendicular to the given line, originating from the
 * given point
 *
 * @param line The line that the returned line should be perpendicular to
 * @param point The point at which the perpendicular line should originate
 */
export function getPerpendicularLine(line: Line, point: Point): Line {
  const dx = line.p2.x - line.p1.x;
  const dy = line.p2.y - line.p1.y;

  const L = Math.sqrt(dx * dx + dy * dy);
  const U = new Point(-dy / L, dx / L);

  const x = point.x - U.x * 1;
  const y = point.y - U.y * 1;

  return new Line(point, new Point(x, y));
}

/**
 * Tests whether a point lies on a line between two other points
 *
 * @param point The point to use
 * @param line The line to check against
 */
export function isPointOnLine(point: Point, line: Line): boolean {
  const distance1 = new Decimal(distanceBetweenPoints(line.p1, point));
  const distance2 = new Decimal(distanceBetweenPoints(line.p2, point));

  if (line.p1.x === point.x) return line.p2.x === point.x;
  if (line.p1.y === point.y) return line.p2.y === point.y;

  return distance1.add(distance2).toFixed(3) === line.length.toFixed(3);
}
