import { seedrandom, state, Callback, prng } from 'seedrandom';

const ARC4_STATE: state.Arc4 = { i: 0, j: 1, S: [2, 3, 4] };
const ALEA_STATE: state.Alea = { c: 1, s0: 2, s1: 3, s2: 4 };
const XOR128_STATE: state.Xor128 = { x: 1, y: 2, z: 3, w: 4 };
const XORWOW_STATE: state.Xorwow = { x: 1, y: 2, z: 3, w: 4, v: 5, d: 6 };
const XORSHIFT7_STATE: state.Xorshift7 = { x: [1, 2, 3], i: 4 };
const XOR4096_STATE: state.Xor4096 = { i: 1, w: 2, X: [3, 4, 5] };
const TYCHEI_STATE: state.Tychei = { a: 1, b: 2, c: 3, d: 4 };
interface TestPassReturn { a: string; }
const TEST_PASS_RETURN: TestPassReturn = { a: 'test' };
const SR_PASS: Callback<TestPassReturn> = () => TEST_PASS_RETURN;
interface TestCallbackReturn { b: number; }
const TEST_CALLBACK_RETURN: TestCallbackReturn = { b: 999 };
const SR_CALLBACK: Callback<TestCallbackReturn> = () => TEST_CALLBACK_RETURN;

// seedrandom()
seedrandom(); // $ExpectType Prng
// seedrandom(seed)
seedrandom('a'); // $ExpectType Prng
seedrandom({ a: 1 }); // $ExpectType Prng
// seedrandom(seed, options)
seedrandom('a', true); // $ExpectType Prng
seedrandom('a', {}); // $ExpectType Prng
seedrandom('a', {entropy: true}); // $ExpectType Prng
seedrandom('a', {state: ARC4_STATE}); // $ExpectType WithState<StateWithArray<"i" | "j", "S">>
seedrandom('a', {state: true}); // $ExpectType WithState<StateWithArray<"i" | "j", "S">>
seedrandom('a', {entropy: true, state: ARC4_STATE}); // $ExpectType WithState<StateWithArray<"i" | "j", "S">>
seedrandom('a', {entropy: true, state: true}); // $ExpectType WithState<StateWithArray<"i" | "j", "S">>
seedrandom('a', {global: true}); // $ExpectType string
seedrandom('a', {entropy: true, global: true}); // $ExpectType string
seedrandom('a', {state: ARC4_STATE, global: true}); // $ExpectType string
seedrandom('a', {state: true, global: true}); // $ExpectType string
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true}); // $ExpectType string
seedrandom('a', {entropy: true, state: true, global: true}); // $ExpectType string
seedrandom('a', {pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {state: true, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, global: true, pass: SR_PASS}); // $ExpectType TestPassReturn
// seedrandom(seed, options, callback)
seedrandom('a', true, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', { entropy: true }, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: ARC4_STATE}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: ARC4_STATE}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: ARC4_STATE, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {state: true, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {entropy: true, state: true, global: true}, SR_CALLBACK); // $ExpectType TestCallbackReturn
seedrandom('a', {pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: ARC4_STATE, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {state: true, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: ARC4_STATE, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn
seedrandom('a', {entropy: true, state: true, global: true, pass: SR_PASS}, SR_CALLBACK); // $ExpectType TestPassReturn

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
seedrandom.alea(); // $ExpectType Prng
// alea(seed)
seedrandom.alea('a'); // $ExpectType Prng
// alea(seed, opts)
seedrandom.alea('a', {state: ALEA_STATE}); // $ExpectType WithState<State<"c" | "s0" | "s1" | "s2">>
seedrandom.alea('a', {state: true}); // $ExpectType WithState<State<"c" | "s0" | "s1" | "s2">>

// xor128()
seedrandom.xor128(); // $ExpectType Prng
// xor128(seed)
seedrandom.xor128('a'); // $ExpectType Prng
// xor128(seed, opts)
seedrandom.xor128('a', {state: XOR128_STATE}); // $ExpectType WithState<State<"x" | "y" | "z" | "w">>
seedrandom.xor128('a', {state: true}); // $ExpectType WithState<State<"x" | "y" | "z" | "w">>

// xorwow()
seedrandom.xorwow(); // $ExpectType Prng
// xorwow(seed)
seedrandom.xorwow('a'); // $ExpectType Prng
// xorwow(seed, opts)
seedrandom.xorwow('a', {state: XORWOW_STATE}); // $ExpectType WithState<State<"x" | "y" | "z" | "w" | "v" | "d">>
seedrandom.xorwow('a', {state: true}); // $ExpectType WithState<State<"x" | "y" | "z" | "w" | "v" | "d">>

// xorshift7()
seedrandom.xorshift7(); // $ExpectType Prng
// xorshift7(seed)
seedrandom.xorshift7('a'); // $ExpectType Prng
// xorshift7(seed, opts)
seedrandom.xorshift7('a', {state: XORSHIFT7_STATE}); // $ExpectType WithState<StateWithArray<"i", "x">>
seedrandom.xorshift7('a', {state: true}); // $ExpectType WithState<StateWithArray<"i", "x">>

// xor4096()
seedrandom.xor4096(); // $ExpectType Prng
// xor4096(seed)
seedrandom.xor4096('a'); // $ExpectType Prng
// xor4096(seed, opts)
seedrandom.xor4096('a', {state: XOR4096_STATE}); // $ExpectType WithState<StateWithArray<"i" | "w", "X">>
seedrandom.xor4096('a', {state: true}); // $ExpectType WithState<StateWithArray<"i" | "w", "X">>

// tychei()
seedrandom.tychei(); // $ExpectType Prng
// tychei(seed)
seedrandom.tychei('a'); // $ExpectType Prng
// tychei(seed, opts)
seedrandom.tychei('a', {state: TYCHEI_STATE}); // $ExpectType WithState<State<"a" | "c" | "d" | "b">>
seedrandom.tychei('a', {state: true}); // $ExpectType WithState<State<"a" | "c" | "d" | "b">>

// Prng
const rng: prng.WithState<state.Arc4> = seedrandom('a', {state: true});
rng(); // $ExpectType number
rng.int32(); // $ExpectType number
rng.quick(); // $ExpectType number
rng.double(); // $ExpectType number
rng.state(); // $ExpectType StateWithArray<"i" | "j", "S">
