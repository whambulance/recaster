import { getIntersection, isPointOnLine } from "../functions";
import { RayResolutions, Shape } from "../interfaces";
import { Line } from "./line";
import { Point } from "./point";

export class Rectangle implements Shape {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    
    lineArray: Line[] = [];

    /**
     * Define a 2d point in space
     * @param x The x-coordinate of the point
     * @param y The y-coordinate of the point
     */
    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }

    getShapeIntersection(line: Line): Point | null {
        const lines = this.lines;
        let intersect: Point | null = null;

        lines.forEach((shapeLine: Line) => {
            let lineIntersect = getIntersection(line, shapeLine);
            if (lineIntersect) {
                intersect = lineIntersect;
            }
        });

        return intersect;
    }

    getShapeRefraction(rayStart: Point, intersect: Point): Line[] {
        const intersectLine = this.lines.find(line => {
            return isPointOnLine(intersect, line)
        })
        if (!intersectLine) {
            throw new EvalError('Intersect provided is invalid, no intersection found')
        }

        //
        return []
    }

    get lines(): Line[] {
        if (!this.lineArray.length) {
            this.lineArray = [
                new Line(this.p1, this.p2),
                new Line(this.p2, this.p3),
                new Line(this.p3, this.p4),
                new Line(this.p4, this.p1),
            ];
        }

        return this.lineArray;
    }

    get points(): Point[] {
        return [this.p1, this.p2, this.p3, this.p4];
    }
}
  