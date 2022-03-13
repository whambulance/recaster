import { Emitter } from "@/interfaces";
import { BoundsGroup, Line, Point } from ".";

class Laser implements Emitter {

    public startPoint: Point;
    public intersectPoint: Point;

    constructor (startPoint: Point, intersectPoint: Point) {
        if (startPoint.x === intersectPoint.x && startPoint.y === intersectPoint.y) {
            throw new EvalError('Points cannot occupy the same space')
        }
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