import { Line, Point } from '../../classes'
import { getRefraction, refractionObject } from '../../functions';

describe('Function: getRefraction', () => {
  const dataset = [
    {
      name: 'Simple straight test',
      startPoint: new Point(2, 11),
      intersectPoint: new Point(6, 15),
      index: 1.52,
      surface: new Line(new Point(2, 15), new Point(10, 15)),
      outputAngle: 2.65773005255755,
    },
    {
      name: 'Simple angled test',
      startPoint: new Point(15, 15),
      intersectPoint: new Point(19, 15),
      index: 1.52,
      surface: new Line(new Point(17, 17), new Point(21, 13)),
      outputAngle: 3.4431282159603622,
    },
    {
      name: '90 Degree surface, positive incidence ray @ 30 degrees',
      startPoint: new Point(.5, 3.1339746),
      intersectPoint: new Point(1, 4),
      index: 1.52,
      surface: new Line(new Point(0, 4), new Point(2, 4)),
      outputAngle: 2.806403958612155,
    },
  ]

  it.each(dataset)('$name', ({ startPoint, intersectPoint, index, surface, outputAngle }) => {
    let testLine = getRefraction(startPoint, intersectPoint, index, surface);
    
    let newX = Math.cos(outputAngle) + intersectPoint.x
    let newY = Math.sin(outputAngle) + intersectPoint.y
    let expectedLine = new Line(intersectPoint, new Point(newX, newY))

    expect(JSON.stringify(expectedLine)).toStrictEqual(JSON.stringify(testLine))
  })
})


describe('Function: getRefraction', () => {
  const dataset = [
    {
      name: '0 degrees rotated Refraction',
      laserStart: new Point(0, 2),
      intersect: new Point(1, 4),
      index: 1.51,
      surface: new Line(new Point(0, 4), new Point(2, 4)),
      returnedTheta1: 1.1071487177940904,
      returnedCorrectedTheta1: 0.4636476090059096,
      returnedTheta2: 0.298638738758609,
      returnedCorrectedTheta2: -13.969146676388400,
      returnedLine: new Line(new Point(1, 4), new Point(1, 1)),
    },
    {
      name: '90 degrees rotated Refraction',
      laserStart: new Point(-1, 7),
      intersect: new Point(1, 6),
      index: 1.51,
      surface: new Line(new Point(1, 5), new Point(1, 7)),
      returnedTheta1: -0.4636476090008061,
      returnedCorrectedTheta1: 0.4636476090059096,
      returnedTheta2: 0.298638738758609,
      returnedCorrectedTheta2: -15.539943003183300,
      returnedLine: new Line(new Point(1, 6), new Point(1, 1)),
    },
    {
      name: '180 degrees rotated Refraction',
      laserStart: new Point(5, 7),
      intersect: new Point(4, 5),
      index: 1.51,
      surface: new Line(new Point(3, 5), new Point(5, 5)),
      returnedTheta1: 0.4636476090059096,
      returnedCorrectedTheta1: 0.4636476090059096,
      returnedTheta2: 0.298638738758609,
      returnedCorrectedTheta2: 0.4636476090059096,
      returnedLine: new Line(new Point(4, 5), new Point(1, 1)),
    },
    {
      name: '270 degrees rotated Refraction',
      laserStart: new Point(9, 5),
      intersect: new Point(7, 6),
      index: 1.51,
      surface: new Line(new Point(7, 5), new Point(7, 7)),
      returnedTheta1: 0.4636476090059096,
      returnedCorrectedTheta1: 0.4636476090059096,
      returnedTheta2: 0.298638738758609,
      returnedLine: new Line(new Point(7, 6), new Point(1, 1)),
    },
    {
      name: '45 degree angled line, 0 degree angle of incidence',
      laserStart: new Point(4, 8),
      intersect: new Point(3, 9),
      index: 1.51,
      surface: new Line(new Point(2, 8), new Point(4, 10)),
      returnedTheta1: 0,
      returnedTheta2: 0.483863,
      returnedLine: new Line(new Point(7, 6), new Point(1, 1)),
    },
  ]

  // it.each(dataset)('$name', ({ laserStart, intersect, index, surface, returnedTheta1, returnedCorrectedTheta1, returnedTheta2, returnedCorrectedTheta2}) => {
  //   let outputObj = getRefraction(laserStart, intersect, index, surface, true)

  //   expect(outputObj.theta1).toEqual(returnedTheta1)
  //   expect(outputObj.correctedTheta1).toEqual(returnedCorrectedTheta1)
  //   expect(outputObj.theta2).toEqual(returnedTheta2)
  //   expect(outputObj.correctedTheta2).toEqual(returnedCorrectedTheta2)

  //   // attempt the same with an inversed surface
  //   outputObj = getRefraction(laserStart, intersect, index, new Line(surface.p2, surface.p1), true)

  //   expect(outputObj.theta1).toEqual(returnedTheta1)
  //   expect(outputObj.correctedTheta1).toEqual(returnedCorrectedTheta1)
  //   expect(outputObj.theta2).toEqual(returnedTheta2)
  //   expect(outputObj.correctedTheta2).toEqual(returnedCorrectedTheta2)

  //   // const testReturnedTheta = getRefraction(laserStart, intersect, index, surface, true)
  //   // expect(testReturnedTheta).toEqual(returnedTheta)

  //   // expect(testReturnedLine).toStrictEqual(returnedLine)
  // })
})
