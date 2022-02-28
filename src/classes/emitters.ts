import { Emitter } from "@/interfaces";
import { Bounds, BoundsGroup, Line, Point } from ".";

class Laser implements Emitter {

    public startPoint: Point;
    public intersectPoint: Point;

    constructor (startPoint: Point, intersectPoint: Point) {
        this.startPoint = startPoint;
        this.intersectPoint = intersectPoint;
    }

    public cast (): Line[] {
        return [new Line(this.startPoint, this.intersectPoint)]
    }

    public getUnsortedBounds (): BoundsGroup {
        return new BoundsGroup(
            [this.startPoint.x, this.intersectPoint.x],
            [this.startPoint.y, this.intersectPoint.y],
        )
    }
}

export { Laser }