import { Bounds, Line, Point } from "../classes"
import { Mirror } from '../receptors'
import { RayResolutions } from "../interfaces"
import { Ray } from "../classes"
import { extendLineByLength } from "../functions"

const dataset = [
    {
        name: 'Ray and two mirrors',
        ray: new Line(new Point(3, 2), new Point(6, 2)),
        receptors: [
            new Mirror(new Line(new Point(9, 0), new Point(13, 4))),
            new Mirror(new Line(new Point(9, 6), new Point(13, 10))),
        ],
        bounds: new Bounds(3, 17, 0, 10),
        rayoutput: {
            rays: [
                new Line(new Point(3, 2), new Point(11, 2)),
                new Line(new Point(11, 2), new Point(11, 8)),
                new Line(new Point(11, 8), new Point(34.20465053408525, 8)),
            ],
            resolution: RayResolutions.Infinity
        }
    },
    // {
    //     name: 'Ray reflecting off of convergence between two mirrors',
    //     ray: new Line(new Point(19, 0), new Point(25, 4)),
    //     receptors: [
    //         new Mirror(new Line(new Point(21, 0), new Point(25, 4))),
    //         new Mirror(new Line(new Point(21, 8), new Point(25, 4))),
    //     ],
    //     bounds: new Bounds(21, 25, 0, 8),
    //     rayoutput: {
    //         rays: [
    //             new Line(new Point(19, 0), new Point(25, 4)),
    //             new Line(new Point(25, 4), new Point(25, 4)),
    //             new Line(new Point(25, 4), new Point(19, 8)),
    //         ],
    //         resolution: RayResolutions.Infinity
    //     }
    // },
]

describe('Ray dataset tests', () => {
    it.each(dataset)(
        '$name',
        ({ ray, receptors, bounds, rayoutput }) => {
            let testRay = new Ray(ray)
            const output = testRay.resolve(receptors, bounds)

            let test = extendLineByLength(ray, bounds.maxBoundLength())
            
            expect(output).toStrictEqual(rayoutput)
        }
    )
})