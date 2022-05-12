import { BoundsGroup, Circle, Line, Point, Triangle } from '../classes';
import { RayResolutions, Receptor } from '../interfaces';
import { getIntersection, getReflection } from '../functions';
import { Rectangle } from '../classes/rectangle';

// export class Refractor implements Receptor {
//   public shape: Rectangle | Circle | Triangle;

//   /**
//    * Construct a mirror between two points
//    * @param mirror The line which the mirror sits on
//    */
//   constructor(shape: Rectangle | Circle | Triangle) {
//     this.shape = shape;
//   }

//   public testIntersect(ray: Line): Point | null {
//     return this.shape.getShapeIntersection(ray);
//   }

//   public handle(rayStart: Point, intersect: Point): Line[] | RayResolutions.Ended[] {
//     const reflectedLine = getReflection(rayStart, intersect, this.mirrorLine);
//     return [reflectedLine];
//   }

//   public getUnsortedBounds(): BoundsGroup {
//     return new BoundsGroup([this.mirrorLine.p1.x, this.mirrorLine.p2.x], [this.mirrorLine.p1.y, this.mirrorLine.p2.y]);
//   }

//   get points(): Point[] {
//     return [this.mirrorLine.p1, this.mirrorLine.p2];
//   }
// }
