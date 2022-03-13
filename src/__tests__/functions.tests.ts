import { Line, Point } from "../classes"
import { getReflection } from '../recaster-functions'

// DO THIS NEXT
// NEXT TIME
// FIX THIS
https://stackoverflow.com/questions/11706215/how-can-i-fix-the-git-error-object-file-is-empty

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
