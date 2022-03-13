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
      // {
      //   mirror: [[7, 5], [4, 8]],
      //   ray: [[1, 2], [7, 8]],
      //   intersect: [5.5, 6.5],
      //   reflectedRay: [[5.5, 6.5], [1, 2]]
      // },
    ]

    pointSets.forEach(pointset => {
      let mirrorPoint1 = new Point(pointset.mirror[0][0], pointset.mirror[0][1])
      let mirrorPoint2 = new Point(pointset.mirror[1][0], pointset.mirror[1][1])
      let mirrorLine = new Line(mirrorPoint1, mirrorPoint2)

      let rayPoint1 = new Point(pointset.ray[0][0], pointset.ray[0][1])
      let rayPoint2 = new Point(pointset.ray[1][0], pointset.ray[1][1])
      let ray = new Line(rayPoint1, rayPoint2)

      let intersectPoint = new Point(pointset.intersect[0], pointset.intersect[1])

      let mirror = new Mirror(mirrorLine)

      const mirrorTestIntersect = mirror.testIntersect(ray)
      expect(mirrorTestIntersect).toStrictEqual(intersectPoint)

      if (mirrorTestIntersect) {
        let reflectPoint1 = new Point(
          pointset.reflectedRay[0][0], pointset.reflectedRay[0][1]
        )
        let reflectPoint2 = new Point(
          pointset.reflectedRay[1][0], pointset.reflectedRay[1][1]
        )
        let reflectedRay =  new Line(reflectPoint1, reflectPoint2)
        
        const mirrorHandle = mirror.handle(ray.p1, intersectPoint)
        expect(mirrorHandle).toStrictEqual([reflectedRay])
      }
    })

  })

})