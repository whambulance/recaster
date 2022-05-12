import { Line, Point } from "../classes";

/**
 * Returns an angle of reflection, given an incoming line and mirror to
 * reflect against
 * @param laserStart The start point of the laser
 * @param intersect The point at which the laser intersects the mirror
 * @param Mirror The line to reflect against
 * @returns Angle of reflection, 0 representing positive travel along the
 * y axis
 */
export function getReflection(laserStart: Point, intersect: Point, mirror: Line): Line {
    // calculate normal for line
    let normalY = mirror.p2.x - mirror.p1.x;
    let normalX = mirror.p1.y - mirror.p2.y;
    const normalLen = Math.sqrt(normalX * normalX + normalY * normalY);
    normalY = normalY / normalLen;
    normalX = normalX / normalLen;
  
    // calculate the tip of the ray that passed through the intersect,
    // equidistant from the start point
    const rayTipXDiff = intersect.x - laserStart.x;
    const rayTipX = intersect.x + rayTipXDiff;
    const rayTipYDiff = intersect.y - laserStart.y;
    const rayTipY = intersect.y + rayTipYDiff;
  
    // calculate the vector that goes from the intersection point of the
    // line and the ray to the tip of the ray
    const rayX = rayTipX - intersect.x;
    const rayY = rayTipY - intersect.y;
  
    const dotProduct = rayX * normalX + rayY * normalY;
  
    const dotNormalX = dotProduct * normalX;
    const dotNormalY = dotProduct * normalY;
  
    let reflectedPointX = rayTipX - dotNormalX * 2;
    let reflectedPointY = rayTipY - dotNormalY * 2;
    reflectedPointX = Number(reflectedPointX.toPrecision(12));
    reflectedPointY = Number(reflectedPointY.toPrecision(12));
    const reflectedPoint = new Point(reflectedPointX, reflectedPointY);
  
    return new Line(intersect, reflectedPoint);
}
