import { Point } from "./point";

export class Vector {
    public val1: number
    public val2: number

    constructor (val1: number, val2: number) {
        this.val1 = val1;
        this.val2 = val2;
    }

    public dot(vector: Vector): number {
        return (vector.val1 * this.val1) + (vector.val2 & this.val2)
    }
}