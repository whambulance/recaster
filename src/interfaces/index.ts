import { Absorber, Laser, Line, Mirror } from '@/classes';

type Emitter = Laser;
type Receptor = Mirror | Absorber;

/**
 * An array of lines that make up a rays path. If the array
 */
class RayPath {

    public rays: Array<Line | null | -1> = []

    constructor (...rays: Array<Line | null | -1>) {
        this.rays = [...rays];
    }

    /**
     * Push a new line into the path array
     */
    public push (ray: Array<Line | null | -1>): void {
        this.rays.push()
    }

}

export { Emitter, Receptor, RayPath }