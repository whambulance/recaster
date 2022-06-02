import { Point } from '../classes';

/**
 * Determines which point has the lowest distance from the origin
 *
 * @param origin The origin point from which all point distances should be
 * generated
 * @param points The list of points to compare against the origin
 * @returns The point with minimum distance from origin
 */
export function getClosestPoint(origin: Point, points: Point[]): Point {
  let minDistance = null;
  let minPoint: Point = new Point(0, 0);

  for (const point of points) {
    const distance = distanceBetweenPoints(origin, point);
    if (minDistance === null || minDistance > distance) {
      minDistance = distance;
      minPoint = point;
    }
  }

  return minPoint;
}

/**
 * Calculate the distance between two given points
 *
 * @param point1 The first point
 * @param point2 The second point
 */
export function distanceBetweenPoints(point1: Point, point2: Point): number {
  const xdiff: number = point1.x - point2.x;
  const ydiff: number = point1.y - point2.y;

  return Math.sqrt(xdiff ** 2 + ydiff ** 2);
}

/**
 * Determines the angle between three given points
 * @param anglePoint The point at which the angle should be touching
 * @param point2 The second point
 * @param point3 The third point
 * @returns The angle between the three points
 */
export function getPointAngle(anglePoint: Point, point2: Point, point3: Point): number {
  const oppositeSideLength = distanceBetweenPoints(point2, point3);
  const side1Length = distanceBetweenPoints(anglePoint, point2);
  const side2Length = distanceBetweenPoints(anglePoint, point3);

  const side1Sq = side1Length * side1Length;
  const side2Sq = side2Length * side2Length;
  const oppSideSq = oppositeSideLength * oppositeSideLength;

  return Math.acos((side1Sq + side2Sq + oppSideSq) / (2 * side1Length * side2Length));
}
