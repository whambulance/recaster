import { Line, Point } from "../classes"
import { extendLineByLength, getIntersection, getReflection } from '../functions'

describe('Function: getReflection', () => {
    const dataset = [
        {
            name: 'Reflection 1',
            laserStart: new Point(1, 2),
            intersect: new Point(5.5, 6.5),
            mirror: new Line(new Point(4, 8), new Point(7, 5)),
            reflectedRay: new Line(new Point(5.5, 6.5), new Point(1, 2))
        },
        {
            name: 'Reflection 2',
            laserStart: new Point(19, 6),
            intersect: new Point(22, 9),
            mirror: new Line(new Point(21, 10), new Point(23, 8)),
            reflectedRay: new Line(new Point(22, 9), new Point(19, 6))
        },
        {
            name: 'Reflection 3',
            laserStart: new Point(20, 0),
            intersect: new Point(24, 2),
            mirror: new Line(new Point(20, 2), new Point(28, 2)),
            reflectedRay: new Line(new Point(24, 2), new Point(28, 0))
        },
        {
            name: 'Reflection 4',
            laserStart: new Point(3, 2),
            intersect: new Point(11, 2),
            mirror: new Line(new Point(9, 0), new Point(13, 4)),
            reflectedRay: new Line(new Point(11, 2), new Point(11, 10))
        },
    ]

    it.each(dataset)(
        '$name',
        ({ laserStart, intersect, mirror, reflectedRay }) => {
            const result = getReflection(laserStart, intersect, mirror)

            expect(result).toStrictEqual(reflectedRay)
        }
    )
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

describe('Function: extendLineByLength', () => {
    const dataset = [
        {
            name: 'Simple horizontal extend',
            line: new Line(new Point(3, 2), new Point(6, 2)),
            extension: 2,
            newLine: new Line(new Point(3, 2), new Point(8, 2)),
        },
        {
            name: 'Floating point diagonal extend',
            line: new Line(new Point(1, 4), new Point(5, 8)),
            extension: 4.242640687119286,
            newLine: new Line(new Point(1, 4), new Point(8, 11)),
        },
        {
            name: 'Floating point horizontal extend',
            line: new Line(new Point(3, 2), new Point(6, 2)),
            extension: 1.473290543895047,
            newLine: new Line(new Point(3, 2), new Point(7.473290543895047, 2)),
        },
    ]

    it.each(dataset)(
        '$name',
        ({ line, extension, newLine }) => {
            const testExtendedLine = extendLineByLength(line, extension)
            
            expect(testExtendedLine).toStrictEqual(newLine)
        }
    )
})
