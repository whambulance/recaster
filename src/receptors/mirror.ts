import { BoundsGroup, Line, Point } from "@/classes"
import { RayResolutions, Receptor } from "@/interfaces"
import { getIntersection, getReflection } from "@/functions"

export class Mirror implements Receptor {
    public mirrorLine: Line

    /**
     * Construct a mirror between two points
     * @param mirror The line which the mirror sits on
     */
    constructor (mirror: Line) {
        if (mirror.p1.x === mirror.p2.x && mirror.p1.y === mirror.p2.y) {
            throw new EvalError('Zero-length lines are not allowed')
        }
        this.mirrorLine = mirror
    }

    public testIntersect (ray: Line): Point | null {
        return getIntersection(ray, this.mirrorLine)
    }

    public handle (rayStart: Point, intersect: Point): Line[] | RayResolutions.Ended[] {
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
