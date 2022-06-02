// Ensure emitters are functioning correctl
import { BoundsGroup, Line, Point } from '../classes';
import { Beam, Laser } from '../emitters';

test('Emitter: Laser', () => {
  let pointSets = [
    [
      [1, 1],
      [2, 2],
    ],
    [
      [1, 1],
      [1, 5],
    ],
    [
      [10, 10],
      [-5, -5],
    ],
    [
      [-10, 1],
      [2, -15],
    ],
    [
      [0, 0],
      [0, 0],
    ],
  ];

  pointSets.forEach((points) => {
    let point1 = new Point(points[0][0], points[0][1]);
    let point2 = new Point(points[1][0], points[1][1]);

    if (point1.x === point2.x && point1.y === point2.y) {
      // If points are the same, it should throw on creation
      expect(() => {
        new Laser(point1, point2);
      }).toThrow(EvalError);
    } else {
      // Otherwise, it should continue as normal
      let laser = new Laser(point1, point2);

      const castOutput = [new Line(point1, point2)];
      expect(laser.cast()).toStrictEqual(castOutput);

      const unsortedBoundsOutput = new BoundsGroup([point1.x, point2.x], [point1.y, point2.y]);
      expect(laser.getUnsortedBounds()).toStrictEqual(unsortedBoundsOutput);
    }
  });
});

describe('Emitter: Beam', () => {
  const datasets = [
    // {
    //   name: 'Basic test 1',
    //   line: new Line(new Point(1, 1), new Point(3, 3)),
    //   density: null,
    //   perpendicularLine: [
    //     new Line(new Point(2, 2), new Point(3, 3)),
    //   ],
    // },
    {
      name: 'Basic test 2',
      line: new Line(new Point(1, 1), new Point(3, 3)),
      density: 1,
      perpendicularLine: [
        new Line(new Point(1.7071067811865475, 1.7071067811865475), new Point(2.414213562373095, 1)),
        new Line(new Point(2.414213562373095, 2.414213562373095), new Point(3.1213203435596424, 1.7071067811865475)),
      ],
    },
  ];

  it.each(datasets)('$name', ({ line, density, perpendicularLine }) => {
    let testBeam = new Beam(line.p1, line.p2);
    if (density) {
      testBeam.setDensity(density);
    }
    let testRays = testBeam.cast();

    expect(testRays).toStrictEqual(perpendicularLine);
  });
});
