import { Line, Point } from '../../classes'
import { getRefraction } from '../../functions';

describe('Function: getRefraction', () => {
  const dataset = [
    {
      name: 'Simple test',
      startPoint: new Point(23, 33),
      intersectPoint: new Point(25.5, 4.5),
      index: 1.52,
      surface: new Line(new Point(0, 1), new Point(2, 3)),
      outputAngle: 0,
    },
  ]

  // UNFINISHED, FINISH THIS
      
  it.each(dataset)('$name', ({ startPoint, intersectPoint, index, surface, outputAngle }) => {
    let test = getRefraction(startPoint, intersectPoint, index, surface);
    
    expect(test).toEqual(outputAngle)
  })
})