/**
 * Generate a seeded random number.
 * 
 * @param seed
 * @param options
 * @param callback
 */
export interface Seedrandom {
  (seed?: any, options?: boolean): Prng;

  <TReturn>(
    seed: any,
    options: Options<Callback<TReturn>>
  ): TReturn | Prng | string;

  <TReturn>(
    seed: any,
    options: Options<undefined>,
    callback: Callback<TReturn>
  ): TReturn;
}

export interface Prng {
  (): number;
  int32(): number;
  quick(): number;
  double(): number;
  state?(): Arc4;
}

export interface MathOptions {
  entropy?: boolean;
  state?: Arc4State;
}

export interface Options<TPass> extends MathOptions {
  global?: boolean;
  pass?: TPass;
}

export interface Callback<TReturn> {
  (prng: Prng, seed: string, is_math_call: true, state: object): TReturn;
}

export interface Arc4State {
  i: number;
  j: number;
  S: number[];
}

export class Arc4 implements Arc4State {
  constructor(key: number[]);
  g(count: number): number;
}

/**
 * The seedrandom function. See {@type Seedrandom} for details.
 */
export const seedrandom: Seedrandom;

export declare global {
  interface Math {
    seedrandom: (seed?: any, options?: MathOptions) => string;
  }
}
