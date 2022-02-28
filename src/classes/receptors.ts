import { RayArray, Receptor } from "@/interfaces"
import { getIntersection, getReflection } from "@/recaster-functions"
import { BoundsGroup, Line, Point } from "."

class Mirror implements Receptor {
    public mirrorLine: Line

    /**
     * Construct a mirror between two points
     * @param mirror The line which the mirror sits on
     */
    constructor (mirror: Line) {
        this.mirrorLine = mirror
    }

    public testIntersect (ray: Line): Point | null {
        return getIntersection(ray, this.mirrorLine)
    }

    public handle (rayStart: Point, intersect: Point): RayArray {
        const reflectedLine = getReflection(rayStart, intersect, this.mirrorLine)
        return [ reflectedLine ]
    }

    public getUnsortedBounds (): BoundsGroup {
        return new BoundsGroup(
            [this.mirrorLine.p1.x, this.mirrorLine.p2.x],
            [this.mirrorLine.p1.y, this.mirrorLine.p2.y],
        )
    }
}

class Absorber implements Receptor {
    public absorberLine: Line

    constructor (absorber: Line) {
        this.absorberLine = absorber
    }

    public handle (rayStart: Point, intersect: Point): RayArray {
        // incomplete
        return [new Line(new Point(0, 0), new Point(0, 0))]
    }

    public getUnsortedBounds (): BoundsGroup {
        // incomplete
        return new BoundsGroup()
    }

    public testIntersect (ray: Line): Point | null {
        return getIntersection(ray, this.absorberLine)
    }
}

export { Mirror, Absorber }