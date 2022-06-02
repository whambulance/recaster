import { BoundsGroup, Line, Point } from '../classes';

export interface Emitter {
  /**
   * Generate an array of Lines, which represent starting rays for
   * RayPaths
   */
  cast(): Line[];

  /**
   * For this emitter, get a BoundsGroup that fully defines the space
   * it takes up
   */
  getUnsortedBounds(): BoundsGroup;

  /**
   * Property which contains a list of points used by this emitter
   */
  points: Point[];
}
