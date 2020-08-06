// Minimum TypeScript Version: 3.5

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export interface Prng {
  int32(): number;
  quick(): number;
  double(): number;
}
export interface PrngWithState<TState> extends Prng {
  state(): TState;
}

export interface Arc4 {
  i: number;
  j: number;
  S: number[];
}
export interface AleaXg {
  c: number;
  s0: number;
  s1: number;
  s2: number;
}
export interface Xor128Xg {
  x: number;
  y: number;
  z: number;
  w: number;
}
export interface XorwowXg {
  x: number;
  y: number;
  z: number;
  w: number;
  v: number;
  d: number;
}
export interface Xorshift7Xg {
  x: number[];
  i: number;
}
export interface Xor4096Xg {
  i: number;
  w: number;
  X: number[];
}
export interface TycheiXg {
  a: number;
  b: number;
  c: number;
  d: number;
}

export interface Callback<TReturn> {
  (prng: PrngWithState<Arc4>, seed: string, is_math_call: true, state: object): TReturn;
}

export interface StateOption<T> {
  state?: T | boolean;
}
export interface MathOptions extends StateOption<Arc4> {
  entropy?: boolean;
}
export interface SeedrandomOptions extends MathOptions {
  global?: boolean;
  pass?: Callback<any>;
}

export interface Seedrandom {
  (seed?: any, options?: boolean): Prng;

  <TOptions extends SeedrandomOptions>(
    seed: any,
    options: TOptions
  ): Pick<TOptions, 'pass'> extends {pass: Callback<infer TReturn>} ? TReturn
      : PropType<TOptions, 'global'> extends true ? string
      : PropType<TOptions, 'state'> extends (Arc4 | true) ? PrngWithState<Arc4>
      : Prng;

  <TReturn, TOptions extends SeedrandomOptions>(
    seed: any,
    options: TOptions | null | undefined,
    callback: Callback<TReturn>
  ): Pick<TOptions, 'pass'> extends {pass: Callback<infer UReturn>} ? UReturn
      : TReturn;

  alea: Alea;

  xor128: Xor128;

  xorwow: Xorwow;

  xorshift7: Xorshift7;

  xor4096: Xor4096;

  tychei: Tychei;
}

export interface Alea {
  (seed?: any): Prng;
  (seed: any, opts?: StateOption<AleaXg> | boolean): PrngWithState<AleaXg>;
}

export interface Xor128 {
  (seed?: any): Prng;
  (seed: any, opts?: StateOption<Xor128Xg> | boolean): PrngWithState<Xor128Xg>;
}

export interface Xorwow {
  (seed?: any): Prng;
  (seed: any, opts?: StateOption<XorwowXg> | boolean): PrngWithState<XorwowXg>;
}

export interface Xorshift7 {
  (seed?: any): Prng;
  (seed: any, opts?: StateOption<Xorshift7Xg> | boolean): PrngWithState<Xorshift7Xg>;
}

export interface Xor4096 {
  (seed?: any): Prng;
  (seed: any, opts?: StateOption<Xor4096Xg> | boolean): PrngWithState<Xor4096Xg>;
}

export interface Tychei {
  (seed?: any): Prng;
  (seed: any, opts?: StateOption<TycheiXg> | boolean): PrngWithState<TycheiXg>;
}

export const seedrandom: Seedrandom;

declare global {
  interface Math {
    seedrandom: (seed?: any, options?: MathOptions) => string;
  }
}
