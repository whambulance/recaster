import { Line, Point, BoundsGroup } from '@/classes';
import { RayResolutions, Receptor } from '@/interfaces';
import { getIntersection } from '@/functions';

export class Absorber implements Receptor {
  public absorberLine: Line;

  constructor(absorber: Line) {
    this.absorberLine = absorber;
  }

  public handle(rayStart: Point, intersect: Point): Line[] | RayResolutions.Ended[] {
    return [RayResolutions.Ended];
  }

  public getUnsortedBounds(): BoundsGroup {
    return new BoundsGroup(
      [this.absorberLine.p1.x, this.absorberLine.p2.x],
      [this.absorberLine.p1.y, this.absorberLine.p2.y],
    );
  }

  public testIntersect(ray: Line): Point | null {
    return getIntersection(ray, this.absorberLine);
  }
}
