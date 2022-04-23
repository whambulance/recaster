import { distanceBetweenPoints } from "@/functions";
import { Point } from "./point";

export class Bounds {
    lowerX: number = 0;
    upperX: number = 0;
    lowerY: number = 0;
    upperY: number = 0;

    constructor (lowerX: number = 0, upperX: number = 0, lowerY: number = 0, upperY: number = 0) {
        this.lowerX = lowerX;
        this.upperX = upperX;
        this.lowerY = lowerY;
        this.upperY = upperY;
    }

    public maxBoundLength (): number {
        const topleft = new Point(this.upperX, this.lowerY)
        const botright = new Point(this.lowerX, this.upperY)
        return distanceBetweenPoints(topleft, botright)
    }
}
