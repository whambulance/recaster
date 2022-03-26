import { Bounds, BoundsGroup, Line, Point } from '@/classes';
import { Emitter, RayArray, Receptor } from './interfaces';
import { extendLineByLength, getClosestPoint } from './recaster-functions';

/**
 * An array of lines that make up a rays path
 */
export class RayPath {

    /**
     * A list of resolved rays
     */
    public rays: RayArray = []

    /**
     * The current outgoing ray which requires resolving
     */
    public outgoingRay: Line = null as any

    /**
     * Initalize a raypath, giving the initial line array
     * @param ray The initial ray this path starts along
     */
    constructor (ray: Line) {
        this.rays = [ray];
    }

    /**
     * Push a new line into the path array
     */
    public push (ray: RayArray): void {
        const pathResolution = this.pathResolution

        if (pathResolution === -1 || pathResolution === null) {
            throw new EvalError(`Unable to push into RayPath. RayPath currently ends with value ${pathResolution}`);
        } else {
            this.rays.push(...ray)
        }
    }

    /**
     * Resolve this RayPath, generating all lines from the given receptor list
     * @param receptors A list of receptors that this ray could possibly
     * @param canvasBounds The outer boundaries of the canvas
     * interact with
     */
    public resolve (receptors: Receptor[], canvasBounds: Bounds): void {
        let pathResolution = this.pathResolution
        this.outgoingRay = this.rays[this.rays.length - 1]

        // ensure that the previousLine is not null or infinity (-1)
        while (pathResolution !== null && pathResolution !== -1) {

            // extend the previousLine beyond the bounds of the canvas
            // (intersectLine)
            const extendLength = canvasBounds.maxBoundLength()
            this.outgoingRay = extendLineByLength(this.outgoingRay, extendLength)

            let intersectionPoints: {intersect: Point, receptorIndex: number}[] = []

            // loop over each receptor and check if the intersectLine intersects 
            // with it
            receptors.forEach((receptor: Receptor, key: number) => {
                let intersect = receptor.testIntersect(this.outgoingRay)
                if (intersect) {
                    intersectionPoints.push({
                        intersect: intersect,
                        receptorIndex: key
                    })
                }
            })

            // if intersectline doesn't intersect anything, then push -1 (infinity),
            // and continue (this path is considered complete)
            if (!receptors.length) {
                this.push([-1])
                continue
            }
            
            // for each receptor it intersects with, figure out which one it 
            // intersects with first
            const points = intersectionPoints.map(function (item) {
                return item.intersect
            })
            const closestPoint = getClosestPoint(this.outgoingRay.p1, points)
            this.outgoingRay.p2 = closestPoint

            let intersectedReceptor: Receptor = null as any
            intersectionPoints.forEach(item => {
                if (item.intersect === closestPoint) {
                    intersectedReceptor = receptors[item.receptorIndex]
                }
            })

            // let the receptor it intersects with first handle intersectLine, and
            // return the newly created line(s)
            const newRays = intersectedReceptor.handle(
                this.outgoingRay.p1,
                this.outgoingRay.p2
            )

            // set intersectLine to the new line
            this.push([this.outgoingRay, ...newRays.slice(0, -1)])
            let lastRay = newRays[newRays.length - 1]
            if (lastRay === -1 || lastRay === null) {
                this.push([lastRay])
            } else {
                this.outgoingRay = lastRay
            }

            // get pathresolution again for the while loop
            pathResolution = this.pathResolution
        }
    }

    /**
     * Get how this path currently resolves
     * 
     * @returns Line Returns a Line if unresolved
     * @returns null Returns null if resolved and ends at the previous line
     * @returns -1 Returns -1 if the raypath continues to infinity
     */
    get pathResolution (): Line | null | -1 {
        return this.rays[this.rays.length - 1]
    }

}

export class Recaster {

    public emitters: Emitter[] = [];
    public receptors: Receptor[] = [];

    public rayPaths: RayPath[] = [];

    public canvasBoundsGroup = new BoundsGroup();
    public canvasBounds = new Bounds();

    public solve (): void {
        this.rayPaths = []
        this.initRayPaths()
        this.resolveBounds()

        this.rayPaths.forEach((rayPath: RayPath, key: number) => {
            rayPath.resolve(this.receptors, this.canvasBounds)
        })
    }

    /**
     * Generate RayPaths from our registered emitters
     */
    public initRayPaths (): void {
        this.emitters.forEach((emitter: Emitter, key: number) => {
            let newLines = emitter.cast();
            newLines.forEach((line: Line) => {
                let newRayPath = new RayPath(line)
                this.rayPaths.push(newRayPath)
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
