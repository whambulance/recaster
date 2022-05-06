import { Line, Point } from '../classes';
import { Laser } from '../emitters';
import { Mirror } from '../receptors';
import { RayResolutions } from '../interfaces';
import { Recaster } from '../recaster';

const dataset = [
  {
    name: 'Ray and two mirrors',
    emitters: [new Laser(new Point(3, 2), new Point(6, 2))],
    receptors: [new Mirror(new Point(9, 0), new Point(13, 4)), new Mirror(new Point(9, 6), new Point(13, 10))],
    rayoutputs: [
      {
        rays: [
          new Line(new Point(3, 2), new Point(11, 2)),
          new Line(new Point(11, 2), new Point(11, 8)),
          new Line(new Point(11, 8), new Point(31.14213562373095, 8)),
        ],
        resolution: RayResolutions.Infinity,
      },
    ],
  },
];

describe('recaster full envrionment tests', () => {
  it.each(dataset)('$name', ({ emitters, receptors, rayoutputs }) => {
    let recaster = new Recaster();
    recaster.emitters = emitters;
    recaster.receptors = receptors;

    const output = recaster.solve();

    expect(output).toStrictEqual(rayoutputs);
  });
});
