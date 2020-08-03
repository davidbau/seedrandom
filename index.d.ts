export interface SeedrandomPrng {
  (): number;
  int32: () => number;
  quick: () => number;
  double: () => number;
}

export interface SeedrandomArc4State {
  i?: number;
  j?: number;
  S?: number[];
}

class SeedrandomArc4 implements SeedrandomArc4State {
  constructor(key: number[]);
  g(count: number): number;
}

export type SeedrandomCallback<R> = (prng: SeedrandomPrng, seed: string, is_math_call: boolean, state: SeedrandomArc4State) => R;

export interface SeedrandomMathOptions {
  entropy?: boolean;
}
export interface SeedrandomOverrideOptions extends SeedrandomMathOptions {
  global: true;
  state?: SeedrandomArc4State;
}
export interface SeedrandomPassOptions extends SeedrandomMathOptions {
  pass: SeedrandomCallback
}
export interface SeedrandomOptions extends SeedrandomMathOptions {
  global?: boolean;
  pass?: SeedrandomCallback;
  state?: SeedrandomArc4State;
}

export function seedrandom(seed?: any): SeedrandomArc4;
export function seedrandom(seed: any, options: SeedrandomOverrideOptions): string;
export function seedrandom<R>(seed: any, options: SeedrandomPassOptions<R>): R;
export function seedrandom(seed?: any, options?: SeedrandomOptions, callback: SeedrandomCallback<R>): SeedrandomArc4;

export declare global {
  interface Math {
    seedrandom: (seed?: any, options?: SeedrandomMathOptions) => string;
  }
}
