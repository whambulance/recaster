import { extendLineByLength, distanceBetweenPoints } from '@/functions';
import { RayResolutions, Receptor, RayOutput } from '@/interfaces';
import { Bounds } from './bounds';
import { Line } from './line';
import { Point } from './point';

/**
 * An array of lines that make up a ray
 */
export class Ray {
  /**
   * A list of resolved rays
   */
  public resolvedRays: Line[] = [];

  /**
   * The current outgoing ray which requires resolving
   */
  public currentRay: Line = null as any;

  /**
   * How the current ray has been resolved, if at all it has been
   */
  public rayResolution: RayResolutions = 0;

  /**
   * The upper limit on the total number of rays that should be
   * calculated when resolving
   */
  public raysLimit: number = 0;

  /**
   * Key of the last intersected receptor
   */
  public lastIntersectedReceptor: number = -1 as any;

  /**
   * Initalize a raypath, giving the initial line array
   * @param ray The initial ray this path starts along
   */
  constructor(ray: Line) {
    this.currentRay = ray;
    this.rayResolution = RayResolutions.Unresolved;
  }

  /**
   * Resolve this RayPath, generating all lines from the given receptor list
   * @param receptors A list of receptors that this ray could possibly
   * @param canvasBounds The outer boundaries of the canvas
   * interact with
   */
  public resolve(receptors: Receptor[], canvasBounds: Bounds): RayOutput {
    // determine the max bound length of the canvas so we know how far
    // to extend our rays by
    const extendLength = canvasBounds.maxBoundLength();

    // counter if we need to construct a limit
    let counter = 0;

    // ensure that the RayResolution is unresolved, and that the
    // counter is below the limit
    while (this.rayResolution === RayResolutions.Unresolved && counter < (this.raysLimit ? this.raysLimit : 1200)) {
      // extend the current ray by the max bound length
      this.currentRay = extendLineByLength(this.currentRay, extendLength);
      const intersectionPoints: {
        receptor: Receptor;
        key: number;
        intersect: Point;
        distance: number;
      }[] = [];

      // loop over each receptor and check if the intersectLine intersects
      // with it
      receptors.forEach((receptor: Receptor, key: number) => {
        if (this.lastIntersectedReceptor === key) {
          return;
        }

        const intersect = receptor.testIntersect(this.currentRay);
        if (intersect) {
          intersectionPoints.push({
            receptor,
            key,
            intersect,
            distance: distanceBetweenPoints(this.currentRay.p1, intersect),
          });
        }
      });

      // if intersectline doesn't intersect anything, then push -1 (infinity),
      // and continue (this path is considered complete)
      if (!intersectionPoints.length) {
        this.rayResolution = RayResolutions.Infinity;
        this.resolvedRays.push(this.currentRay);
        continue;
      }

      // sort by distance to find the closest point
      intersectionPoints.sort((a, b) => {
        if (a.distance < b.distance) return -1;
        else if (a.distance > b.distance) return 1;
        else return 0;
      });

      // get the receptor into a variable, shorten the currentray to the
      // intersection point
      const intersectedReceptor = intersectionPoints[0].receptor;
      this.lastIntersectedReceptor = intersectionPoints[0].key;
      this.currentRay.p2 = intersectionPoints[0].intersect;

      // let the receptor it intersects with first handle intersectLine, and
      // return the newly created line(s)
      const newRays = intersectedReceptor.handle(this.currentRay.p1, this.currentRay.p2);

      // set intersectLine to the new line
      this.resolvedRays.push(this.currentRay);
      this.currentRay = null as any;

      if (newRays.length > 1) {
        // figure out what to do here, because we will likely need
        // to resolve multiple raypaths - meaning we would need to
        // create more raypaths in the parent
      }

      if (newRays[0] instanceof Line) {
        this.currentRay = newRays[0];
      } else {
        this.rayResolution = RayResolutions.Ended;
      }

      counter += 1;
    }

    return {
      rays: this.resolvedRays,
      resolution: this.rayResolution,
    };
  }

  get output(): RayOutput {
    return {
      rays: this.resolvedRays,
      resolution: this.rayResolution,
    };
  }
}
