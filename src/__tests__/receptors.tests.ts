import { Line, Point, Ray, Rectangle } from '../classes';
import { Mirror, Refractor } from '../receptors';
import { extendLineByLength } from '../functions';
import { Recaster } from '../recaster';
import { Emitter, RayResolutions, Receptor } from '../interfaces';
import { Laser } from '../emitters';

describe('Receptor: Mirror', () => {
  test('Invalid input values', () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(0, 0);

    expect(() => {
      new Mirror(point1, point2);
    }).toThrow(EvalError);
  });

  describe('Resolving reflection dataset', () => {
    const dataset = [
      {
        name: 'Generic true reflection 1',
        mirror: new Mirror(new Point(7, 5), new Point(4, 8)),
        ray: new Line(new Point(1, 2), new Point(7, 8)),
        intersect: new Point(5.5, 6.5),
        reflectedRay: new Line(new Point(5.5, 6.5), new Point(1, 2)),
      },
      {
        name: 'Generic true reflection 2',
        mirror: new Mirror(new Point(3, 3), new Point(11, 3)),
        ray: new Line(new Point(3, 5), new Point(7, 3)),
        intersect: new Point(7, 3),
        reflectedRay: new Line(new Point(7, 3), new Point(11, 5)),
      },
      {
        name: 'Generic false reflection 1',
        mirror: new Mirror(new Point(3, 0), new Point(11, 0)),
        ray: new Line(new Point(2, 2), new Point(12, 0)),
        intersect: null,
        reflectedRay: null,
      },
      {
        name: 'Generic false reflection 2',
        mirror: new Mirror(new Point(3, 0), new Point(11, 0)),
        ray: new Line(new Point(2, 0), new Point(7, 0)),
        intersect: null,
        reflectedRay: null,
      },
      {
        name: 'Generic short true reflection 1',
        mirror: new Mirror(new Point(9, 0), new Point(13, 4)),
        ray: new Line(new Point(3, 2), new Point(6, 2)),
        intersect: new Point(11, 2),
        reflectedRay: new Line(new Point(11, 2), new Point(11, 10)),
      },
    ];

    it.each(dataset)('$name', ({ mirror, ray, intersect, reflectedRay }) => {
      let extendedRay = extendLineByLength(ray, 100);

      const mirrorTestIntersect = mirror.testIntersect(extendedRay);
      expect(mirrorTestIntersect).toStrictEqual(intersect);

      if (intersect) {
        const mirrorHandle = mirror.handle(ray.p1, intersect);
        expect(mirrorHandle).toStrictEqual([reflectedRay]);
      }
    });
  });
});

describe('Receptor: Refractor', () => {
  // describe('Refraction dataset', () => {
  //   const dataset = [
  //     // {
  //     //   name: 'Basic rectangle refraction',
  //     //   rayStart: new Point(3, 3),
  //     //   intersect: new Point(5, 4),
  //     //   rectangle: new Rectangle(
  //     //     new Point(5, 3), new Point(6, 3), new Point(6, 6), new Point(5, 6)
  //     //   ),
  //     //   output: [
  //     //     new Line(new Point(5, 4), new Point(6, 4.915588815336)),
  //     //     new Line(new Point(6, 4.915588815336), new Point(7.645119582936019, 17.8109240094401)),
  //     //   ],
  //     // },
  //   ];

  //   it.each(dataset)('$name', ({rayStart, intersect, rectangle, output}) => {
  //     let refractor = new Refractor(rectangle);
  //     let testOutput = refractor.handle(rayStart, intersect);

  //     expect(testOutput).toStrictEqual(output);
  //   });

  // });

  describe('Refraction top level', () => {
    const dataset = [
      {
        name: 'Simple refraction on quadrilateral',
        emitters: [new Laser(new Point(1, 2), new Point(3, 3))],
        receptors: [new Refractor(new Rectangle(new Point(5, 3), new Point(6, 3), new Point(6, 6), new Point(5, 6)))],
        output: [
          {
            rays: [
              new Line(new Point(1, 2), new Point(5, 4)),
              new Line(new Point(5, 4), new Point(6, 4.310079382733)),
              new Line(new Point(6, 4.310079382733), new Point(15.44998274103001, 9.0350707533146)),
            ],
            resolution: RayResolutions.Infinity,
          },
        ],
      },
    ];

    it.each(dataset)('$name', ({ emitters, receptors, output }) => {
      let recaster = new Recaster();

      emitters.forEach((emitter) => {
        recaster.addEmitter(emitter as any);
      });

      receptors.forEach((receptor) => {
        recaster.addReceptor(receptor as Refractor);
      });

      const testOutput = recaster.solve();
      expect(testOutput).toStrictEqual(output);
    });
  });
});
