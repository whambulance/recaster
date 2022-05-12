import { Circle, Point, Rectangle, Triangle } from "../../classes"
import { isPointInTriangle, isPointInRectangle, isPointInCircle } from "../../functions"

describe('Function: isPointInTriangle', () => {
  const dataset = [
    {
      name: 'Simple valid triangle 1',
      triangle: new Triangle(
        new Point(25, 2), new Point(27, 5), new Point(23, 5)
      ),
      point: new Point(25.5, 4.5),
      isInside: true, 
    },
    {
      name: 'Simple invalid triangle 1',
      triangle: new Triangle(
        new Point(25, 2), new Point(27, 5), new Point(23, 5)
      ),
      point: new Point(21.5, 5),
      isInside: false, 
    },
  ]
      
  it.each(dataset)('$name', ({ triangle, point, isInside }) => {
    let test = isPointInTriangle(point, triangle);
    
    expect(test).toEqual(isInside)
  })
})
    
describe('Function: isPointInRectangle', () => {
  const dataset = [
    {
      name: 'Simple valid rectangle 1',
      rectangle: new Rectangle(
        new Point(20, 7), new Point(24, 7), new Point(24, 9), new Point(20, 9) 
        ),
      point: new Point(23, 8),
      isInside: true, 
    },
    {
      name: 'Simple invalid rectangle 1',
      rectangle: new Rectangle(
        new Point(20, 7), new Point(24, 7), new Point(24, 9), new Point(20, 9) 
      ),
      point: new Point(21, 10.75),
      isInside: false, 
    },
  ]
      
  it.each(dataset)('$name', ({ rectangle, point, isInside }) => {
    let test = isPointInRectangle(point, rectangle);
    
    expect(test).toEqual(isInside)
  })
})
    
describe('Function: isPointInCircle', () => {
  const dataset = [
    {
      name: 'Simple valid circle 1',
      circle: new Circle(new Point(2.5, 9), new Point(2.5, 6.75)),
      point: new Point(3, 8),
      isInside: true, 
    },
    {
      name: 'Simple invalid circle 1',
      circle: new Circle(new Point(2.5, 9), new Point(2.5, 6.75)),
      point: new Point(6.5, 9),
      isInside: false, 
    },
  ]
  
  it.each(dataset)('$name', ({ circle, point, isInside }) => {
    let test = isPointInCircle(point, circle);
    
    expect(test).toEqual(isInside)
  })
})