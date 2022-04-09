import { Bounds, BoundsGroup, Line, Point } from '@/classes';
import { Emitter, RayOutput, RayResolutions, Receptor } from './interfaces';
import { distanceBetweenPoints, extendLineByLength } from './recaster-functions';

/**
 * An array of lines that make up a ray
 */
export class Ray {

    /**
     * A list of resolved rays
     */
    public resolvedRays: Line[] = []

    /**
     * The current outgoing ray which requires resolving
     */
    public currentRay: Line = null as any

    /**
     * How the current ray has been resolved, if at all it has been
     */
    public rayResolution: RayResolutions = 0

    /**
     * The upper limit on the total number of rays that should be 
     * calculated when resolving
     */
    public raysLimit: number = 0

    /**
     * Key of the last intersected receptor
     */
    public lastIntersectedReceptor: number = -1 as any

    /**
     * Initalize a raypath, giving the initial line array
     * @param ray The initial ray this path starts along
     */
    constructor (ray: Line) {
        this.currentRay = ray
        this.rayResolution = RayResolutions.Unresolved
    }

    /**
     * Resolve this RayPath, generating all lines from the given receptor list
     * @param receptors A list of receptors that this ray could possibly
     * @param canvasBounds The outer boundaries of the canvas
     * interact with
     */
    public resolve (receptors: Receptor[], canvasBounds: Bounds): RayOutput {

        // determine the max bound length of the canvas so we know how far
        // to extend our rays by
        const extendLength = canvasBounds.maxBoundLength()

        // counter if we need to construct a limit
        let counter = 0

        // ensure that the RayResolution is unresolved, and that the 
        // counter is below the limit
        while (
            this.rayResolution === RayResolutions.Unresolved
            && counter < ( this.raysLimit ? this.raysLimit : 1200 ) 
        ) {

            // extend the current ray by the max bound length
            this.currentRay = extendLineByLength(this.currentRay, extendLength)
            let intersectionPoints: {
                receptor: Receptor,
                key: number,
                intersect: Point,
                distance: number
            }[] = []

            // loop over each receptor and check if the intersectLine intersects 
            // with it
            receptors.forEach((receptor: Receptor, key: number) => {
                if (this.lastIntersectedReceptor === key) {
                    return
                }

                let intersect = receptor.testIntersect(this.currentRay)
                if (intersect) {
                    intersectionPoints.push({
                        receptor: receptor,
                        key: key,
                        intersect: intersect,
                        distance: distanceBetweenPoints(
                            this.currentRay.p1, intersect
                        )
                    })
                }
            })

            // if intersectline doesn't intersect anything, then push -1 (infinity),
            // and continue (this path is considered complete)
            if (!intersectionPoints.length) {
                this.rayResolution = RayResolutions.Infinity
                this.resolvedRays.push(this.currentRay)
                continue
            }

            // sort by distance to find the closest point
            intersectionPoints.sort((a, b) => {
                if (a.distance < b.distance) return -1
                else if (a.distance > b.distance) return 1
                else return 0
            })

            // get the receptor into a variable, shorten the currentray to the
            // intersection point
            const intersectedReceptor = intersectionPoints[0].receptor
            this.lastIntersectedReceptor = intersectionPoints[0].key
            this.currentRay.p2 = intersectionPoints[0].intersect

            // let the receptor it intersects with first handle intersectLine, and
            // return the newly created line(s)
            const newRays = intersectedReceptor.handle(
                this.currentRay.p1,
                this.currentRay.p2
            )
            
            // set intersectLine to the new line
            this.resolvedRays.push(this.currentRay)
            this.currentRay = null as any

            if (newRays.length > 1) {
                // figure out what to do here, because we will likely need
                // to resolve multiple raypaths - meaning we would need to
                // create more raypaths in the parent
            }

            if (newRays[0] instanceof Line) {
                this.currentRay = newRays[0]
            } else {
                this.rayResolution = RayResolutions.Ended
            }
        }

        return {
            rays: this.resolvedRays,
            resolution: this.rayResolution
        }
    }

    get output (): RayOutput {
        return {
            rays: this.resolvedRays,
            resolution: this.rayResolution
        }
    }
}

export class Recaster {

    public emitters: Emitter[] = []
    public receptors: Receptor[] = []

    public rays: Ray[] = []
    public rayOutputs: RayOutput[] = []

    public canvasBoundsGroup = new BoundsGroup()
    public canvasBounds = new Bounds()

    public solve (): RayOutput[] {
        this.rays = []
        this.initRays()
        this.resolveBounds()

        this.rays.forEach((rayPath: Ray, key: number) => {
            let output = rayPath.resolve(this.receptors, this.canvasBounds)
            this.rayOutputs.push(output)
        })

        return this.rayOutputs
    }

    /**
     * Generate RayPaths from our registered emitters
     */
    public initRays (): void {
        this.emitters.forEach((emitter: Emitter, key: number) => {
            let newLines = emitter.cast();
            newLines.forEach((line: Line) => {
                let newRayPath = new Ray(line)
                this.rays.push(newRayPath)
            })
        })
    }

    /**
     * Generate the overall canvas boundaries based on the given emitters
     * and receptors
     */
    public resolveBounds (): void {
        this.emitters.forEach((emitter: Emitter, key: number) => {
            if (typeof emitter.getUnsortedBounds === "function") {
                let bounds = emitter.getUnsortedBounds()
                this.canvasBoundsGroup.x.push(...bounds.x)
                this.canvasBoundsGroup.y.push(...bounds.y)
            }
        })

        this.receptors.forEach((receptor: Receptor, key: number) => {
            if (typeof receptor.getUnsortedBounds === "function") {
                let bounds = receptor.getUnsortedBounds()
                this.canvasBoundsGroup.x.push(...bounds.x)
                this.canvasBoundsGroup.y.push(...bounds.y)
            }
        })

        this.canvasBounds = this.canvasBoundsGroup.bounds()
    }

    public addEmitter (emitter: Emitter): void {
        this.emitters.push(emitter)
    }

    public addReceptor (receptor: Receptor): void {
        this.receptors.push(receptor)
    }
}
