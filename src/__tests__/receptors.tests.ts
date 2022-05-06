import { Line, Point } from '../classes';
import { Mirror } from '../receptors';
import { extendLineByLength } from '../functions';

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
