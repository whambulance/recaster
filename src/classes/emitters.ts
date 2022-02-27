import { Line, Point } from ".";

class Laser {
    public startPoint: Point;
    public intersectPoint: Point;

    /**
     * The path that the laser this emitter generates follows
     */
    public laserPath: Line[] = []

    constructor (startPoint: Point, intersectPoint: Point) {
        this.startPoint = startPoint;
        this.intersectPoint = intersectPoint;
    }

    public cast (): Line[] {
        return [new Line(this.startPoint, this.intersectPoint)]
    }
}

export { Laser }