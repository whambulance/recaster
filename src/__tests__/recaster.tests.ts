// recaster tests

import { Laser, Line, Mirror, Point } from "../classes"
import { Recaster } from '../recaster'

const environments = [
    {
        name: 'Ray and two mirrors',
        emitters: [new Laser(new Point(3, 2), new Point(6, 2))],
        receptors: [
            new Mirror(new Line(new Point(9, 0), new Point(13, 4))),
            new Mirror(new Line(new Point(9, 6), new Point(13, 10))),
        ],
        rayPaths: [
            [
                new Line(new Point(3, 2), new Point(11, 2)),
                new Line(new Point(11, 2), new Point(11, 8)),
                new Line(new Point(11, 8), new Point(17, 8)),
            ]
        ],
    },
]

describe('recaster full envrionment tests', () => {
    environments.forEach(env => {
        test(`test - ${env.name}`, () => {

            console.log('emitters', JSON.stringify(env.emitters))

            let recaster = new Recaster
            recaster.emitters = env.emitters
            recaster.receptors = env.receptors

            recaster.solve()
            console.log('inited raypaths', JSON.stringify(recaster.rayPaths))

        })
    })
})
