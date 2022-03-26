import { distanceBetweenPoints } from '@/recaster-functions';

export class Point {
    x: number;
    y: number;

    /**
     * Define a 2d point in space
     * @param x The x-coordinate of the point
     * @param y The y-coordinate of the point
     */
    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Line {
    p1: Point;
    p2: Point;

    /**
     * Define a 2d line between two points
     * @param p1 The first point of the line (This should also be 
     * considered the starting point for any laser)
     * @param p2 The second point of the line
     */
    constructor (p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
    }

    /**
     * Get length of the line
     * @returns Length between the two line points
     */
    get length (): number {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        return Math.hypot(dx, dy);
    }
}

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

export class BoundsGroup {
    x: number[] = [];
    y: number[] = [];

    constructor (xList: number[] = [], yList: number[] = []) {
        this.x.push(...xList);
        this.y.push(...yList);
    }

    private numberCompare(a: number, b: number): number {
        return a - b;
    }

    public bounds (): Bounds {
        let timsort = require('timsort');

        timsort.sort(this.x, this.numberCompare)
        timsort.sort(this.y, this.numberCompare)

        return new Bounds(
            this.x[0],
            this.x[this.x.length - 1],
            this.y[0],
            this.y[this.y.length - 1]
        )
    }
}

export * from './receptors'
export * from './emitters'