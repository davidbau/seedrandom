import {
  seedrandom,
  Arc4,
  Callback,
  AleaXg,
  Xor128Xg,
  XorwowXg,
  Xorshift7Xg,
  Xor4096Xg,
  TycheiXg
} from 'seedrandom';

const { alea, xor128, xorwow, xorshift7, xor4096, tychei } = seedrandom;

const ARC4_STATE: Arc4 = { i: 0, j: 1, S: [2, 3, 4] };
const ALEA_STATE: AleaXg = {c: 1, s0: 2, s1: 3, s2: 4};
const XOR128_STATE: Xor128Xg = {x: 1, y: 2, z: 3, w: 4};
const XORWOW_STATE: XorwowXg = {x: 1, y: 2, z: 3, w: 4, v: 5, d: 6};
const XORSHIFT7_STATE: Xorshift7Xg = {x: [1, 2, 3], i: 4};
const XOR4096_STATE: Xor4096Xg = {i: 1, w: 2, X: [3, 4, 5]};
const TYCHEI_STATE: TycheiXg = {a: 1, b: 2, c: 3, d: 4};
interface TestPassReturn { a: string; }
const TEST_PASS_RETURN: TestPassReturn = { a: 'test' };
const SR_PASS: Callback<TestPassReturn> = (prng, seed, is_math_call, state) => TEST_PASS_RETURN;
interface TestCallbackReturn { b: number; }
const TEST_CALLBACK_RETURN: TestCallbackReturn = { b: 999 };
const SR_CALLBACK: Callback<TestCallbackReturn> = (prng, seed, is_math_call, state) => TEST_CALLBACK_RETURN;

// seedrandom()
seedrandom(); // $ExpectType Prng
// seedrandom(seed)
seedrandom('a'); // $ExpectType Prng
seedrandom({ a: 1 }); // $ExpectType Prng
// seedrandom(seed, options)
seedrandom('a', true); // $ExpectType Prng
seedrandom('a', {}); // $ExpectType Prng
seedrandom('a', {entropy: true}); // $ExpectType Prng
seedrandom('a', {state: ARC4_STATE}); // $ExpectType PrngWithState<Arc4>
seedrandom('a', {entropy: true, state: ARC4_STATE}); // $ExpectType PrngWithState<Arc4>
seedrandom('a', {entropy: true, state: true}); // $ExpectType PrngWithState<Arc4>
seedrandom('a', {entropy: true, state: false}); // $ExpectType Prng
seedrandom('a', {global: true}); // $ExpectType string
seedrandom('a', {entropy: true, global: true}); // $ExpectType string
seedrandom('a', {entropy: true, global: false}); // $ExpectType Prng
seedrandom('a', {state: ARC4_STATE, global: true}); // $ExpectType string
seedrandom('a', {state: ARC4_STATE, global: false}); // $ExpectType PrngWithState<Arc4>
seedrandom('a', {state: true, global: true}); // $ExpectType string
seedrandom('a', {state: true, global: false}); // $ExpectType PrngWithState<Arc4>
seedrandom('a', {state: false, global: true}); // $ExpectType string
seedrandom('a', {state: false, global: false}); // $ExpectType Prng
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true}); // $ExpectType string
seedrandom('a', {entropy: true, state: ARC4_STATE, global: false}); // $ExpectType PrngWithState<Arc4>
seedrandom('a', {entropy: true, state: true, global: true}); // $ExpectType string
seedrandom('a', {entropy: true, state: true, global: false}); // $ExpectType PrngWithState<Arc4>
seedrandom('a', {entropy: true, state: false, global: true}); // $ExpectType string
seedrandom('a', {entropy: true, state: false, global: false}); // $ExpectType Prng
seedrandom('a', {pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, global: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, global: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: true, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: true, global: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: false, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: false, global: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, global: false, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: false, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: false, global: false, pass: SR_PASS}); // $ExpectType TestPassReturn
// seedrandom(seed, options, callback)
seedrandom('a', null, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', undefined, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', { entropy: true }, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: ARC4_STATE}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: ARC4_STATE}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, global: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: ARC4_STATE, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: ARC4_STATE, global: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: true, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: true, global: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: false, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: false, global: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: true, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: true, global: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: false, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: false, global: false}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, global: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, global: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: true, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: true, global: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: false, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: false, global: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, global: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: false, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: false, global: false, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn

// Math.seedrandom()
Math.seedrandom(); // $ExpectType string
// Math.seedrandom(seed)
Math.seedrandom('a'); // $ExpectType string
// Math.seedrandom(seed, opts)
Math.seedrandom('a', {}); // $ExpectType string
Math.seedrandom('a', {entropy: true}); // $ExpectType string
Math.seedrandom('a', {state: ARC4_STATE}); // $ExpectType string
Math.seedrandom('a', {entropy: true, state: ARC4_STATE}); // $ExpectType string

// alea()
alea(); // $ExpectType Prng
// alea(seed)
alea('a'); // $ExpectType Prng
// alea(seed, opts)
alea('a', true); // $ExpectType PrngWithState<AleaXg>
alea('a', {state: ALEA_STATE}); // $ExpectType PrngWithState<AleaXg>

// xor128()
xor128(); // $ExpectType Prng
// xor128(seed)
xor128('a'); // $ExpectType Prng
// xor128(seed, opts)
xor128('a', true); // $ExpectType PrngWithState<Xor128Xg>
xor128('a', {state: XOR128_STATE}); // $ExpectType PrngWithState<Xor128Xg>

// xorwow()
xorwow(); // $ExpectType Prng
// xorwow(seed)
xorwow('a'); // $ExpectType Prng
// xorwow(seed, opts)
xorwow('a', true); // $ExpectType PrngWithState<XorwowXg>
xorwow('a', {state: XORWOW_STATE}); // $ExpectType PrngWithState<XorwowXg>

// xorshift7()
xorshift7(); // $ExpectType Prng
// xorshift7(seed)
xorshift7('a'); // $ExpectType Prng
// xorshift7(seed, opts)
xorshift7('a', true); // $ExpectType PrngWithState<Xorshift7Xg>
xorshift7('a', {state: XORSHIFT7_STATE}); // $ExpectType PrngWithState<Xorshift7Xg>

// xor4096()
xor4096(); // $ExpectType Prng
// xor4096(seed)
xor4096('a'); // $ExpectType Prng
// xor4096(seed, opts)
xor4096('a', true); // $ExpectType PrngWithState<Xor4096Xg>
xor4096('a', {state: XOR4096_STATE}); // $ExpectType PrngWithState<Xor4096Xg>

// tychei()
tychei(); // $ExpectType Prng
// tychei(seed)
tychei('a'); // $ExpectType Prng
// tychei(seed, opts)
tychei('a', true); // $ExpectType PrngWithState<TycheiXg>
tychei('a', {state: TYCHEI_STATE}); // $ExpectType PrngWithState<TycheiXg>
