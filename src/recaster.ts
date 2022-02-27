import { Line } from '@/classes';
import { Emitter, Receptor } from './interfaces';

class Recaster {

    public emitters: Emitter[] = [];
    public receptors: Receptor[] = [];

    public rays: Line[] = []

    public solve (): void {
        this.emitters.forEach((emitter: Emitter, key: number) => {

        })
    }
}

export { Recaster };