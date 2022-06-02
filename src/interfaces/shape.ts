import { Line, Point } from '../classes';

export interface Shape {
  /**
   * Returns an array of lines which make the edges of this shape
   */
  lines: Line[];

  /**
   * Returns an array of points which make up this shape
   */
  points: Point[];

  /**
   * Check if a line intersects this shape. Returns the point of
   * intersection if it does, else returns null
   */
  getShapeIntersection(line: Line): Point | null;
}
