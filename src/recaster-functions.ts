
type Point = [number, number]
type Line = [Point, Point]

/**
 * Calculates the determinant value for two points, given a 2x2 matrix,
 * 
 * Det = ad - bc
 *  
 * @param point1 First point, [a, b]
 * @param point2 Second Point, [c, d]
 * @returns determinant value
 */
function calcDet (point1: Point, point2: Point): number {
    return ( point1[0] * point2[1] ) - ( point1[1] * point2[0] )
}

/**
 * Calculates if two lines intersect, and returns the intersection point
 * if they do. Otherwise, returns null
 * 
 * @param line1 First line
 * @param line2 Second line
 * @returns null if no intersection
 * @returns Point of intersection
 */
function getIntersection (line1: Line, line2: Line): Point | null {
    // Implements https://stackoverflow.com/a/20677983

    const xdiff: Point = [ line1[0][0] - line1[1][0], line2[0][0] - line2[1][0] ]
    const ydiff: Point = [ line1[0][1] - line1[1][1], line2[0][1] - line2[1][1] ]

    const div = calcDet(xdiff, ydiff)
    if (div === 0) {
        return null
    }

    const d: Point = [ calcDet(...line1), calcDet(...line2) ]
    const x: number = calcDet(d, xdiff) / div
    const y: number = calcDet(d, ydiff) / div
    const intersectionPoint: Point = [ x, y ]
    
    return intersectionPoint
}

/**
 * Calculate the distance between two given points
 * @param point1 The first point
 * @param point2 The second point
 */
function distanceBetweenPoints (point1: Point, point2: Point): number {
    const xdiff: number = point1[0] - point2[0]
    const ydiff: number = point1[1] - point2[1]

    return Math.sqrt((xdiff * xdiff) + (ydiff * ydiff))
}

/**
 * Determines the angle between three given points
 * @param anglePoint The point at which the angle should be touching
 * @param point2 The second point
 * @param point3 The third point
 * @returns The angle between the three points
 */
function getPointAngle (anglePoint: Point, point2: Point, point3: Point): number {
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
 * @param laserIntersect The point at which the laser intersects the mirror
 * @param Mirror The line to reflect against
 * @returns Angle of reflection, 0 representing positive travel along the
 * y axis
 */
function getReflection (laserStart: Point, laserIntersect: Point, mirror: Line): number {

    // get two angles (triangles) from the given arguments:
    // tri1 = [lasertStart, laserIntersect, mirror[0]]
    // tri2 = [laser[0], laser[1], mirror[1]]

    // Calculate angle [laserIntersect(y + 1), laserIntersect, mirror[0]] (mirrorangle1)
    // Calculate angle [laserStart, laserIntersect, mirror[0]] (lasermirrorangle1)

    // Angle between north of intersect, intersect, and mirror point 0
    const mirrorFromNorth = getPointAngle(laserIntersect, [laserIntersect[0], laserIntersect[1] + 1], mirror[0])
    
    // Angle between mirror point 0, intersect, and laser start/
    const laserMirrorFirst = getPointAngle(mirror[0], laserIntersect, laserStart)
    

}
















