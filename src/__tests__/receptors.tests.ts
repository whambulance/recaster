import { Laser, Line, Mirror, Point } from "../classes"

describe('Receptor: Mirror', () => {

  test('Invalid input values', () => {
    const point1 = new Point(0, 0)
    const point2 = new Point(0, 0)
    const invalidLine = new Line(point1, point2)
    
    expect(() => {
      new Mirror(invalidLine)
    }).toThrow(EvalError)
  })

  test('Intersections and Reflections', () => {

    const pointSets = [
      {
        mirror: [[7, 5], [4, 8]],
        ray: [[1, 2], [7, 8]],
        intersect: [5.5, 6.5],
        reflectedRay: [[5.5, 6.5], [1, 2]],
      },
      {
        mirror: [[3, 3], [11, 3]],
        ray: [[3, 5], [7, 3]],
        intersect: [7, 3],
        reflectedRay: [[7, 3], [11, 5]],
      },
      {
        mirror: [[3, 0], [11, 0]],
        ray: [[2, 2], [12, 0]],
        intersect: null,
        reflectedRay: null,
      },
      {
        mirror: [[3, 0], [11, 0]],
        ray: [[2, 0], [7, 0]],
        intersect: null,
        reflectedRay: null,
      },
    ]

    pointSets.forEach(pointset => {
      // define mirror
      const mirrorPoint1 = new Point(pointset.mirror[0][0], pointset.mirror[0][1])
      const mirrorPoint2 = new Point(pointset.mirror[1][0], pointset.mirror[1][1])
      const mirrorLine = new Line(mirrorPoint1, mirrorPoint2)
      const mirror = new Mirror(mirrorLine)

      // define incoming ray
      const rayPoint1 = new Point(pointset.ray[0][0], pointset.ray[0][1])
      const rayPoint2 = new Point(pointset.ray[1][0], pointset.ray[1][1])
      const ray = new Line(rayPoint1, rayPoint2)

      // define whether it intersects, and the intersect point if so
      const hasIntersect = !!pointset.intersect
      const mirrorTestIntersect = mirror.testIntersect(ray)

      if (hasIntersect) {
        const intersectPoint = new Point(pointset.intersect[0], pointset.intersect[1])
        expect(mirrorTestIntersect).toStrictEqual(intersectPoint)
      } else {
        expect(mirrorTestIntersect).toEqual(null)
      }

      if (hasIntersect) {
        const intersectPoint = new Point(pointset.intersect[0], pointset.intersect[1])
        // calculate the reflected ray if it exists
        const reflectPoint1 = new Point(
          pointset.reflectedRay[0][0], pointset.reflectedRay[0][1]
        )
        const reflectPoint2 = new Point(
          pointset.reflectedRay[1][0], pointset.reflectedRay[1][1]
        )
        const reflectedRay =  new Line(reflectPoint1, reflectPoint2)
        
        const mirrorHandle = mirror.handle(ray.p1, intersectPoint)
        expect(mirrorHandle).toStrictEqual([reflectedRay])
      }
    })

  })

})
