import { BoundsGroup, Line, Point } from '../classes';

export enum RayResolutions {
  Unresolved = 0,
  Ended = 1,
  Infinity = 2,
}

export interface RayOutput {
  rays: Line[];
  resolution: RayResolutions;
}

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
}

export interface Receptor {
  /**
   * Test if a receptor intersects with a ray
   *
   * @param ray The ray to test this receptors intesection with
   */
  testIntersect(ray: Line): Point | null;

  /**
   * Handle how the incoming ray interacts with this receptor, and
   * return an array of outgoing rays post-interaction
   *
   * @param rayStart The startpoint for the incoming ray
   * @param intersect The point at which the ray intersects with this
   * receptor
   * @returns Array of lines created by this receptor
   */
  handle(rayStart: Point, intersect: Point): Line[] | RayResolutions.Ended[];

  /**
   * For this receptor, get a BoundsGroup that fully defines the space
   * it takes up
   */
  getUnsortedBounds(): BoundsGroup;
}
