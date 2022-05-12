import { Circle, Line, Point, Rectangle, Triangle } from "../classes";
import { distanceBetweenPoints } from "./points";

export function sign(p1: Point, p2: Point, p3: Point): number {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

export function isPointInTriangle (point: Point, triangle: Triangle): boolean {
    const d1 = sign(point, triangle.p1, triangle.p2);
    const d2 = sign(point, triangle.p2, triangle.p3);
    const d3 = sign(point, triangle.p3, triangle.p1);

    const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}

export function isPointInRectangle (point: Point, rectangle: Rectangle): boolean {
    let inside = true;

    rectangle.lines.forEach((line: Line) => {
        const A = -(line.p2.y - line.p1.y);
        const B = line.p2.x - line.p1.x;
        const C = -(A * line.p1.x + B * line.p1.y);

        const D = A * point.x + B * point.y + C;

        if (D < 0) {
            inside = false;
            return;
        }
    });

    return inside;
}

export function isPointInCircle (point: Point, circle: Circle): boolean {
    const distFromCenter = distanceBetweenPoints(point, circle.center)
    return distFromCenter < circle.radius
}

export function isPointOnCircle (point: Point, circle: Circle): boolean {
    const distFromCenter = distanceBetweenPoints(point, circle.center)
    return distFromCenter === circle.radius
}