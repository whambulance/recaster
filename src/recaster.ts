import { Bounds, BoundsGroup, Line } from '@/classes';
import { Emitter, RayOutput, Receptor } from './interfaces';
import { Ray } from './classes/ray';

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
            const output = rayPath.resolve(this.receptors, this.canvasBounds)
            this.rayOutputs.push(output)
        })

        return this.rayOutputs
    }

    /**
     * Generate RayPaths from our registered emitters
     */
    public initRays (): void {
        this.emitters.forEach((emitter: Emitter, key: number) => {
            const newLines = emitter.cast();
            newLines.forEach((line: Line) => {
                const newRayPath = new Ray(line)
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
                const bounds = emitter.getUnsortedBounds()
                this.canvasBoundsGroup.x.push(...bounds.x)
                this.canvasBoundsGroup.y.push(...bounds.y)
            }
        })

        this.receptors.forEach((receptor: Receptor, key: number) => {
            if (typeof receptor.getUnsortedBounds === "function") {
                const bounds = receptor.getUnsortedBounds()
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
