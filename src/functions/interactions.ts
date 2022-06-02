import { Line, Point } from '../classes';

/**
 * Returns an outgoing reflected line, given an incoming line and mirror to
 * reflect against
 * @param laserStart The start point of the laser
 * @param intersect The point at which the laser intersects the mirror
 * @param Mirror The line to reflect against
 * @returns Outgoing line after reflection has taken place
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

/**
 * Returns an outgoing refracted line, given an incoming line, refractive
 * index, and surface to refract through
 * @param laserStart The start point of the laser
 * @param intersect The point at which the laser intersects the mirror
 * @param index The Refractive index
 * @param surface The line to reflect against
 * @returns Outgoing line after refraction has taken place
 */
export function getRefraction(
  laserStart: Point,
  intersect: Point,
  surface: Line,
  startIndex: number = 1,
  exitIndex: number = 1,
): Line {
  // Calculate the absolute angle of the incoming ray 0rad being a line from x1 -> x2
  const incomingRayAngle = Math.atan2(laserStart.y - intersect.y, laserStart.x - intersect.x);
  const absIncomingRayAngle = incomingRayAngle < 0 ? 2 * Math.PI - Math.abs(incomingRayAngle) : incomingRayAngle;

  // Caluclate the absolute angle of the surface
  const surfaceAngle = Math.atan2(surface.p1.y - intersect.y, surface.p1.x - intersect.x);
  const absSurfaceAngle = surfaceAngle < 0 ? 2 * Math.PI - Math.abs(surfaceAngle) : surfaceAngle;

  // Calculating the normal angle. Add pi/2 to it,
  const initialAbsNormalAngle = absSurfaceAngle + (absIncomingRayAngle > absSurfaceAngle ? 1 : -1) * 1.5707963268;
  let absNormalAngle = 0;

  const normalRayDiff = Math.abs(initialAbsNormalAngle - absIncomingRayAngle);
  if (normalRayDiff > Math.PI / 2) {
    absNormalAngle = (initialAbsNormalAngle > Math.PI / 2 ? 1 : -1) * Math.PI + initialAbsNormalAngle;
  } else {
    absNormalAngle = initialAbsNormalAngle;
  }

  const absInverseNormalAngle = (absNormalAngle < Math.PI / 2 ? 1 : -1) * Math.PI + absNormalAngle;

  // Take the angle of the line away from theta1, "correcting" it against the x-axis
  // const theta1 = (((absIncomingRayAngle >= 0 ? 1 : -1) * 1.5707963268) - absIncomingRayAngle) + surfaceAngle;
  const theta1 = Math.abs(absNormalAngle - absIncomingRayAngle);
  const theta2 = Math.asin(Math.sin(theta1) * (startIndex / exitIndex));

  if (isNaN(theta2)) {
    return getReflection(laserStart, intersect, surface);
  }

  // Add the angle of the line back onto theta2, "correcting" it against the x-axis
  const absOutgoingAngle =
    absIncomingRayAngle > absNormalAngle ? absInverseNormalAngle + theta2 : absInverseNormalAngle - theta2;

  const newX = Math.cos(absOutgoingAngle) + intersect.x;
  const newY = Math.sin(absOutgoingAngle) + intersect.y;
  const newPoint = new Point(newX, newY);

  return new Line(intersect, newPoint);
}
