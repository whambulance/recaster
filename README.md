# Recaster
### A 2d Raycasting engine written in Typescript

[![NPM Version][npm-image]][npm-url]

Recaster is an extendable 2d raycasting engine. Built in typescript, it's easy to extend and add more variations and objects for the engine to work with!
## Using Recaster in your project
Recaster is easy to import, simply import the `Recaster` class into your project to begin

```ts
import { Recaster } from "@whambulance/recaster";

let recaster = new Recaster;
```

The engine objects are split into two types:

* **Emitters** These generate rays for the engine to consume
* **Receptors** These interact with rays produced by Emitters

Here is a list of the Emitters & Receptors currently available to the engine:
# Emitters
## Laser
The Laser Emitter generates a single ray in a direction. The Laser class constructor accepts two Points:
* **startPoint** The Origin point for the laser
* **intersectPoint** The point through which the laser will intersect and continue
```ts
import { Laser, Point } from "@whambulance/recaster";
const start = new Point(2, 3);
const intersect = new Point(5, 8);

const newLaser = new Laser(start, intersect);
recaster.addEmitter(newLaser)
```
## Beam
The Beam Emitter generates a number of rays, directly out of a single line. The Beam class constructor accepts two Points:
* **firstPoint** The first point of the Beam line
* **secondPoint** The second point of the Beam line
```ts
import { Beam, Point } from "@whambulance/recaster";
const firstPoint = new Point(2, 3);
const secondPoint = new Point(5, 8);

const newBeam = new Beam(firstPoint, secondPoint);
recaster.addEmitter(newBeam)
```
# Receptors
## Mirror
The Mirror Receptor is a straight line mirror, which reflects any rays that it intercepts in any direction. The Mirror class constructor accepts two Points - which refer to the two edge points of the Mirror
```ts
import { Mirror, Point } from "@whambulance/recaster";
const firstPoint = new Point(2, 3);
const secondPoint = new Point(5, 8);

const newMirror = new Mirror(firstPoint, secondPoint);
recaster.addReceptor(newMirror)
``` 
## Absorber
The Absorber Receptor is a straight line which stops any rays that it intersects. The Absorber class constructor accepts two Points, which refer to the two edge points of the Absorber
```ts
import { Absorber, Point } from "@whambulance/recaster";
const firstPoint = new Point(2, 3);
const secondPoint = new Point(5, 8);

const newAbsorber = new Absorber(firstPoint, secondPoint);
recaster.addReceptor(newAbsorber)
``` 
# Solving your environment
Once you've setup your environment by adding your required Emitters & Receptors, you need to compute your ray paths by solving the engine.

Solving the engine returns an array of `RayOutput` classes

```ts
const rayOutputs = recaster.solve()
rayOutputs.forEach((rayOutput: RayOutput) => {
    ...
})
```

The `RayOutput` class has two parts - `rayOutput.rays`, and `rayOutput.rayResolution`.

* `rayOutput.rays` An Array of `Line` classes. Each line makes up a rays path in the environment
* `rayOutput.rayResolution` An enum value which represents how the rays termination should be handled

The `RayResolution` enum is defined as shown:
```ts
enum RayResolutions {
  Unresolved = 0, // The engine is unsure how this path should be resolved. There was likely an error processing the path
  Ended = 1, // The path terminates at the last Line in the rays array
  Infinity = 2, // The last ray is assumed to continue to infinity 
}
```
# Extending the Objects
Additional Emitters or Receptors can quite easily be defined and pushed into the engine. 
## New Emitters & Receptors
New Emitter & Receptor classes must implement following functions:
### getUnsortedBounds()
`getUnsortedBounds()` is a function which returns an instance of the `BoundsGroup` class.

The BoundsGroup class is a list of all Point x & y values that this emitter is positioned with. It should be defined as follows:

```ts
import { BoundsGroup } from "@whambulance/recaster"

const xValues = [6, 4, 8, 1]
const yValues = [3, 9, 6, 2]
const newBoundsGroup = new BoundsGroup(xValues, yValues)
```
### points (getter)
`points` is a getter function which returns an Array of `Point` classes

Every point used to make up this Emitter should be returned as an array by this getter 
## New Emitters
New Emitters must implement the `Emitter` interface.

```ts
import { Emitter } from "@whambulance/recaster"

export class NewEmitter implements Emitter {
    ...
}
```
New emitters are also required required to have the following functions by default:
### cast()
`cast()` is a function which returns an Array of `Line` classes.

The lines returned by this function will be used as starting points for RayPaths.
### 
## New Receptors
New Emitters must implement the `Receptor` interface.

```ts
import { Receptor } from "@whambulance/recaster"

export class NewReceptor implements Receptor {
    ...
}
```
New receptors are also required required to have the following functions by default:
### testIntersect()
`testIntersect(ray: Line)` is a function which returns a `Point` class instance, or null

This function should determine whether an incoming Ray (`Line`) intersects with your new object, given it's position on and makeup.

### handle()
`handle(rayStart: Point, intersect: Point)` is a function which handles a ;known intersection between a ray, and your object. The engine assumes intersection is true, based on what returned from the `testIntersect()` function.

* `rayStart` is the origin point of the incoming ray
* `intersect` is the point at which the ray intersects your object (As per what was returned by your objects `testIntersect()` method)

This should return an Array of new `Line` classes. Each of these will begin new RayPaths inside the engine. Returning an array containing a single `Line` class is acceptable here.

[npm-image]: https://img.shields.io/npm/v/@whambulance/recaster.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@whambulance/recaster
