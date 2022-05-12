import { Line, Point } from "../classes";

/**
 * Returns an outgoing reflected line, given an incoming line and mirror to
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

/**
 * Returns an outgoing refracted line, given an incoming line, refractive
 * index, and surface to refract through
 * @param laserStart The start point of the laser
 * @param intersect The point at which the laser intersects the mirror
 * @param index The Refractive index
 * @param surface The line to reflect against
 * @returns Angle of reflection, 0 representing positive travel along the
 * y axis
 */
export function getRefraction(laserStart: Point, intersect: Point, index: number, surface: Line): number {
    const theta1 = Math.atan2(intersect.y - laserStart.y, intersect.x - laserStart.x)
    
    const theta2 = Math.asin( ( 1  * Math.sin(theta1) ) / index )

    return theta2
}

// working out for getRefraction

// n1 = refractive index of 1st material
// n2 = refractive index of 2nd material

// theta1 = angle of incidence for incoming ray (angle from line perpendicular to surface it intersects)
// theta2 = angle of incidence for outogoing ray

// n1 * sine( theta1 ) = n2 * sine ( theta2 )

// (n1 * sine (theta1 ) ) / n2 = sine( theta2 )

// arcsine ( ( n1 * sine ( theta1 )) / n2 ) = theta2

// theta1 = 20
// n1 = 1
// n2 = 1.49
// sine(theta1) = 0.34202014332566873304409961468226
// n1 * sine ( theta1 ) = 0.34202014332566873304409961468226
// ( n1 * sine ( theta1 )) / n2 = 0.2295437203527978074121473924042
// arcsine ( ( n1 * sine ( theta1 )) / n2 ) = 13.270210153999865125356403318962

// 0.656397
