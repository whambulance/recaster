import { Line, Point } from '../../classes'
import { getRefraction } from '../../functions';

describe('Function: getRefraction', () => {
  const dataset = [
    {
      name: 'Simple straight test',
      startPoint: new Point(2, 11),
      intersectPoint: new Point(6, 15),
      index: 1.52,
      surface: new Line(new Point(2, 15), new Point(10, 15)),
      outputAngle: 2.6577300525602316,
    },
    {
      name: 'Simple angled test',
      startPoint: new Point(15, 15),
      intersectPoint: new Point(19, 15),
      index: 1.52,
      surface: new Line(new Point(17, 17), new Point(21, 13)),
      outputAngle: 3.44312821595768,
    },
  ]

  // UNFINISHED, FINISH THIS
      
  it.each(dataset)('$name', ({ startPoint, intersectPoint, index, surface, outputAngle }) => {
    let test = getRefraction(startPoint, intersectPoint, index, surface);
    
    expect(test).toEqual(outputAngle)
  })
})
