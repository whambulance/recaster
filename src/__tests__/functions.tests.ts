import { Line, Point } from "../classes"
import { getIntersection, getReflection } from '../recaster-functions'

test('Function: getReflection', () => {
    const tests = [
        {
            laserStart: new Point(1, 2),
            intersect: new Point(5.5, 6.5),
            mirror: new Line(new Point(4, 8), new Point(7, 5)),
            reflectedRay: new Line(new Point(5.5, 6.5), new Point(1, 2))
        },
        {
            laserStart: new Point(19, 6),
            intersect: new Point(22, 9),
            mirror: new Line(new Point(21, 10), new Point(23, 8)),
            reflectedRay: new Line(new Point(22, 9), new Point(19, 6))
        },
        {
            laserStart: new Point(20, 0),
            intersect: new Point(24, 2),
            mirror: new Line(new Point(20, 2), new Point(28, 2)),
            reflectedRay: new Line(new Point(24, 2), new Point(28, 0))
        },
    ]

    tests.forEach(test => {
        let result = getReflection(
            test.laserStart,
            test.intersect,
            test.mirror
        )

        expect(result).toStrictEqual(test.reflectedRay)
    })
})

test('Function: testIntersect', () => {
    const tests = [
        {
            mirror: new Line(new Point(8, -3), new Point(15, -6)),
            ray: new Line(new Point(16, -1), new Point(16, -8)),
            intersect: null,
        },
        {
            mirror: new Line(new Point(3, 0), new Point(11, 0)),
            ray: new Line(new Point(2, 2), new Point(12, 0)),
            intersect: null,
        },
    ]

    tests.forEach(test => {
        let result = getIntersection(test.ray, test.mirror)

        expect(result).toStrictEqual(test.intersect)
    })
})
