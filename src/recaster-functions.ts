import Decimal from "decimal.js";
import { Line, Point } from "./classes"

/**
 * Given three co-linear points, check if point q lies on line (q, r)
 * 
 * @param p First collinear point
 * @param q Second collinear point
 * @param r Third collinear point
 * @returns boolean
 */
function onSegment(p: Point, q: Point, r: Point)
{
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
    return true;
   
    return false;
}

/**
 * Find the orientation of an ordered triplet (p, q, r)
 * 
 * @param p First ordered point
 * @param q Second ordered point
 * @param r Third ordered point
 * @returns 0 --> p, q, and r are collinear
 * @returns 1 --> points are clockwise
 * @returns 2 --> points are counter-clockwise
 */
function pointOrientation (p: Point, q: Point, r: Point): 0 | 1 | 2 {
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
   
    if (val == 0) return 0; // collinear
   
    return (val > 0) ? 1 : 2; // clock or counterclock wise
}

function doLinesIntersect (line1: Line, line2: Line): boolean {

    const o1 = pointOrientation(line1.p1, line1.p2, line2.p1)
    const o2 = pointOrientation(line1.p1, line1.p2, line2.p2)
    const o3 = pointOrientation(line2.p1, line2.p2, line1.p1)
    const o4 = pointOrientation(line2.p1, line2.p2, line1.p2)

    // General case
    if (o1 != o2 && o3 != o4) return true

    return false
}

/**
 * Calculates the determinant value for two points, given a 2x2 matrix,
 *  
 * @param point1 First point
 * @param point2 Second point
 * @returns Determinant number
 */
export function calcDet (point1: Point, point2: Point): number {
    const num1 = new Decimal(point1.x).times(point2.y)
    const num2 = new Decimal(point1.y).times(point2.x)
    return num1.minus(num2).toNumber();
    // return point1.x * point2.y - point1.y * point2.x
}

/**
 * Calculates if two lines intersect, and returns the intersection point
 * if they do. Otherwise, returns null
 * 
 * @param line1 First line
 * @param line2 Second line
 * @returns Point of intersection | Null if no intersection point
 */
export function getIntersection (line1: Line, line2: Line): Point | null {
    const linesIntersect = doLinesIntersect(line1, line2)

    if (!linesIntersect) {
        return null
    }
    
    const xdiff = new Point(
        new Decimal(line1.p1.x).minus(line1.p2.x).toNumber(),
        new Decimal(line2.p1.x).minus(line2.p2.x).toNumber()
    )
    const ydiff = new Point(
        new Decimal(line1.p1.y).minus(line1.p2.y).toNumber(),
        new Decimal(line2.p1.y).minus(line2.p2.y).toNumber()
    )

    const div = calcDet(xdiff, ydiff)

    const d = new Point(calcDet(line1.p1, line1.p2), calcDet(line2.p1, line2.p2))
    const x: number = new Decimal(calcDet(d, xdiff)).dividedBy(div).toDecimalPlaces(12).toNumber()
    const y: number = new Decimal(calcDet(d, ydiff)).dividedBy(div).toDecimalPlaces(12).toNumber()
    const intersectionPoint = new Point(x, y)
    
    return intersectionPoint
}

/**
 * Determines which point has the lowest distance from the origin
 * 
 * @param origin The origin point from which all point distances should be
 * generated
 * @param points The list of points to compare against the origin
 * @returns The point with minimum distance from origin
 */
export function getClosestPoint (origin: Point, points: Point[]): Point {
    let minDistance = null
    let minPoint: Point = new Point(0, 0)

    for (const point of points) {
        let distance = distanceBetweenPoints(origin, point)
        if (minDistance === null || minDistance > distance) {
            minDistance = distance
            minPoint = point
        }
    }

    return minPoint
}

/**
 * Extend a line by a given value
 * 
 * @param line The line to be extended
 * @param extension How far to extend the line
 */
export function extendLineByLength (line: Line, extension: number): Line {
    const lineLength = line.length
    const newX = new Decimal(line.p2.x).minus(line.p1.x).dividedBy(lineLength).times(extension).add(line.p2.x);
    const newY = new Decimal(line.p2.y).minus(line.p1.y).dividedBy(lineLength).times(extension).add(line.p2.y);

    return new Line(line.p1, new Point(newX.toNumber(), newY.toNumber()))
}

/**
 * Calculate the distance between two given points
 * 
 * @param point1 The first point
 * @param point2 The second point
 */
export function distanceBetweenPoints (point1: Point, point2: Point): number {
    const xdiff: number = point1.x - point2.x
    const ydiff: number = point1.y - point2.y

    return Math.sqrt((xdiff ** 2) + (ydiff ** 2))
}

/**
 * Determines the angle between three given points
 * @param anglePoint The point at which the angle should be touching
 * @param point2 The second point
 * @param point3 The third point
 * @returns The angle between the three points
 */
export function getPointAngle (anglePoint: Point, point2: Point, point3: Point): number {
    const oppositeSideLength = distanceBetweenPoints(point2, point3)
    const side1Length = distanceBetweenPoints(anglePoint, point2)
    const side2Length = distanceBetweenPoints(anglePoint, point3)

    const side1Sq = side1Length * side1Length
    const side2Sq = side2Length * side2Length
    const oppSideSq = oppositeSideLength * oppositeSideLength

    return Math.acos((side1Sq + side2Sq + oppSideSq) / (2 * side1Length * side2Length))
}

/**
 * Returns an angle of reflection, given an incoming line and mirror to
 * reflect against
 * @param laserStart The start point of the laser
 * @param intersect The point at which the laser intersects the mirror
 * @param Mirror The line to reflect against
 * @returns Angle of reflection, 0 representing positive travel along the
 * y axis
 */
export function getReflection (laserStart: Point, intersect: Point, mirror: Line): Line {

    // calculate normal for line
    let normalY = mirror.p2.x - mirror.p1.x
    let normalX = mirror.p1.y - mirror.p2.y
    const normalLen = Math.sqrt((normalX * normalX) + (normalY * normalY))
    normalY = normalY / normalLen
    normalX = normalX / normalLen

    // calculate the tip of the ray that passed through the intersect,
    // equidistant from the start point
    const rayTipXDiff = intersect.x - laserStart.x
    const rayTipX = intersect.x + rayTipXDiff
    const rayTipYDiff = intersect.y - laserStart.y
    const rayTipY = intersect.y + rayTipYDiff

    // calculate the vector that goes from the intersection point of the 
    // line and the ray to the tip of the ray
    const rayX = rayTipX - intersect.x
    const rayY = rayTipY - intersect.y

    const dotProduct = (rayX * normalX) + (rayY * normalY)

    const dotNormalX = dotProduct * normalX
    const dotNormalY = dotProduct * normalY

    let reflectedPointX = rayTipX - (dotNormalX * 2)
    let reflectedPointY = rayTipY - (dotNormalY * 2)
    reflectedPointX = Number(reflectedPointX.toPrecision(12))
    reflectedPointY = Number(reflectedPointY.toPrecision(12))
    const reflectedPoint = new Point(reflectedPointX, reflectedPointY)

    return new Line(intersect, reflectedPoint)
}
