import { Line } from '../classes';
export * from './shape';
export * from './emitter';
export * from './receptor';

export enum RayResolutions {
  Unresolved = 0,
  Ended = 1,
  Infinity = 2,
}

export interface RayOutput {
  rays: Line[];
  resolution: RayResolutions;
}
