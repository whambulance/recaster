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

export interface refractionObject {
    laserStart: Point,
    intersect: Point,
    theta1: number,
    lineAngle: number,
    surface: Line,
    correctedTheta1: number,
    theta2: number,
    correctedTheta2: number,
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
export function getRefraction(laserStart: Point, intersect: Point, index: number, surface: Line): Line {
    // Calculates angle of laser & line from pi radians on a circle. i.e. y=0 along x-axis
    const theta1 = Math.atan2(intersect.y - laserStart.y, intersect.x - laserStart.x);
    const lineAngle = Math.abs(Math.atan2(surface.p2.y - surface.p1.y, surface.p2.x - surface.p1.x) % Math.PI);

    console.log('getrefraction', {
        laserStart: laserStart,
        intersect: intersect,
        index: index,
        surface: surface,
    })

    // Take the angle of the line away from theta1, "correcting" it against the x-axis
    const correctedTheta1 = (((theta1 >= 0 ? 1 : -1) * 1.5707963268) - theta1) + lineAngle;
    // const correctedTheta1 = (1.5707963268 - theta1);
    console.log('step1', Math.abs(Math.sin(correctedTheta1)))
    console.log('step2', Math.abs(Math.sin(correctedTheta1)) * (1 / index))
    console.log('step3', Math.asin(Math.abs(Math.sin(correctedTheta1)) * (1 / index)))
    const theta2 = Math.asin(Math.abs(Math.sin(correctedTheta1)) / index);

    // BUGGED - FIX THIS - asin not properly calculating

    console.log('theta2', theta2)

    // Add the angle of the line back onto theta2, "correcting" it against the x-axis
    const correctedTheta2 = (((theta1 >= 0 ? 1 : 0) * Math.PI) - theta2) + lineAngle;

    // let output: refractionObject = {
    //     laserStart: laserStart,
    //     intersect: intersect,
    //     theta1: theta1,
    //     lineAngle: lineAngle,
    //     surface: surface,
    //     correctedTheta1: correctedTheta1,
    //     theta2: theta2,
    //     correctedTheta2: correctedTheta2,
    // }

    // console.log('output', output)
    // return output

    console.log('correctedTheta2', correctedTheta2);

    const newX = Math.cos(correctedTheta2) + intersect.x
    const newY = Math.sin(correctedTheta2) + intersect.y
    const newPoint = new Point(newX, newY);

    return new Line(intersect, newPoint);
}