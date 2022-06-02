import { Line, Point } from '../../classes';
import { getRefraction } from '../../functions';

describe('Function: getRefraction', () => {
  const dataset = [
    {
      name: 'Simple straight test',
      startPoint: new Point(2, 11),
      intersectPoint: new Point(6, 15),
      enterIndex: 1,
      exitIndex: 1.52,
      surface: new Line(new Point(2, 15), new Point(10, 15)),
      absOutputAngle: 1.0869337257677565,
    },
    {
      name: 'Simple angled test',
      startPoint: new Point(15, 15),
      intersectPoint: new Point(19, 15),
      enterIndex: 1,
      exitIndex: 1.52,
      surface: new Line(new Point(21, 17), new Point(17, 13)),
      absOutputAngle: -0.30153556236546547,
    },
    {
      name: 'Simple angled test reversed',
      startPoint: new Point(22, 6),
      intersectPoint: new Point(20, 8),
      enterIndex: 1,
      exitIndex: 1.52,
      surface: new Line(new Point(18, 6), new Point(22, 10)),
      absOutputAngle: 2.3561944901940906,
    },
    {
      name: '90 Degree surface, positive incidence ray @ 30 degrees',
      startPoint: new Point(0.5, 3.1339746),
      intersectPoint: new Point(1, 4),
      enterIndex: 1,
      exitIndex: 1.52,
      surface: new Line(new Point(0, 4), new Point(2, 4)),
      absOutputAngle: 1.235607631822362,
    },
    {
      name: '0 Degree surface, negative incidence ray @ 15 degrees',
      startPoint: new Point(2.8, -1),
      intersectPoint: new Point(2, 2),
      enterIndex: 1,
      exitIndex: 1.52,
      surface: new Line(new Point(1, 2), new Point(3, 2)),
      absOutputAngle: 1.7411337531309687,
    },
    {
      name: '0 Degree surface, negative incidence ray @ 15 degrees',
      startPoint: new Point(4, 0.46),
      intersectPoint: new Point(6, 1),
      enterIndex: 1,
      exitIndex: 1.52,
      surface: new Line(new Point(6, 0), new Point(6, 2)),
      absOutputAngle: 0.17234257836106978,
    },
  ];

  it.each(dataset)('$name', ({ startPoint, intersectPoint, enterIndex, exitIndex, surface, absOutputAngle }) => {
    let testLine = getRefraction(startPoint, intersectPoint, surface, enterIndex, exitIndex);

    let newX = Math.cos(absOutputAngle) + intersectPoint.x;
    let newY = Math.sin(absOutputAngle) + intersectPoint.y;
    let expectedLine = new Line(intersectPoint, new Point(newX, newY));

    expect(JSON.stringify(testLine)).toStrictEqual(JSON.stringify(expectedLine));
  });
});
