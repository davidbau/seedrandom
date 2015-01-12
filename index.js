// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.
//
// The default random number generator is about 8 times slower
// than native Math.random, but it is very unpredictable because
// it is based on the cryptographic ARC4 sequence.  If you do not
// need more than 32 bits of randomness, random.quick() returns
// a number faster, but still 3.6x slower than native.
//
// This library includes simpler algorithms that generate
// high-quality (non-cryptographic) randomness much faster.
//
// For example, xor4096 is only 2.1x slower than native,
// but its 2^4128-2^32-period sequence  passes all common
// statistical tests for randomness.
//
// var rng = seedrandom.xor4096(seed);
// var r = rng();    // 0 <= r < 1
//
// Here are the algorithms, along with speed versus native
// Math.random on Chrome.
//
//            speed  period       BigCrush failures
// xor128     1.7x   2^128-1      MatrixRank, LinearComp
// xsadd      1.9x   2^128-1      several when bits are reversed
// xorwow     1.9x   2^192-2^32   CollisionOver, SimpPoker, LinearComp
// xorshift7  2.1x   2^256-1      none
// xor4096    2.1x   2^4128-2^32  none
// tychei     2.2x   2^128-1      none
//
// These speedy algorithsm all return 32 bits of randomness.
//
// For 53 bits of randomness into (0..1), call "double":
// var u = rng.double();
//
// To generate a raw int32 with 32 random bits, call "int32":
// var i = rng.int32();
//
// If using one of these algorithms in the browser, you can
// include the code directly under the /xor/ directory to avoid
// pulling in code for the other algorithms.
//
// Background on these fast xor-based algorithms.
//
// In 2003, George Marsaglia discovered a class of fast RNGs
// using only xor and shift operations, yet while providing a
// robust level of randomness unusual for their simplicity.
// (http://www.jstatsoft.org/v08/i14/paper).
//
// Several others have studied this class of generators and
// proposed variants that improve aspects of the randomness.
// The best algorithms that can be implemented in Javascript
// are included here, and benchmarked against calls to
// Javascript's native Math.random() on Chrome on a fast PC:
//
// native: 15.5 nanoseconds per call, 1.0x native random.
//
// xor128 is a very fast pure xor-shift generator from Marsaglia's
// original paper.  Though xor128 passes the Diehard tests, it fails
// other statistical tests of randomness.  Marsaglia also
// proposed xorwow, which adds a simple Weyl generator
// to add more robustness.

// xor128: 25.7 nanoseconds per call, 1.7x native random.
// A pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = require('./xor/xor128');

// xorwow: 29.6 nanoseconds per call, 1.9x native random.
// George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = require('./xor/xorwow');

// xsadd adds robustness through an addition step; it was
// proposed by Mutsuo Saito and Makoto Matsumoto (author of MT19937)
// (http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/XSADD/index.html),
// and it passes all BigCrush tests; although it fails some if
// bits are reversed.  Sebastiano Vigna recently proposed another
// algorithm based on this idea, "xorshift128+", which fixes
// weaknesses in the lower bits; unfortunatly, that improved
// algorithm requires 64-bit arithmatic and is not fast in Javascript.

// xsadd: 28.9 nanoseconds per call, 1.9x native random.
// Mutsuo Saito and Makoto Matsumoto's xorshift with an addition.
// Period: 2^128-1.
// Fails no tests in normal mode.
// Fails when bits reversed: LinearComp, MatrixRank, MaxOft, Permutation.
var xsadd = require('./xor/xsadd');

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.

// xorshift7: 32.4 nanoseconds per call, 2.1x native random.
// François Panneton & Pierre L'ecuyer's 7-shift generator with 256 bits.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = require('./xor/xorshift7');

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.

// xor4096: 32.9 nanoseconds per call, 2.1x native random.
// Richard Brent's 4096-bit "xorgens" xor shift plus weyl.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = require('./xor/xor4096');

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

// tychei: 34.5 nanoseconds per call, 2.2x native random.
// Richard Brent's 4096-bit "xorgens" xor shift plus weyl.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var tychei = require('./xor/tychei');

var sr = require('./seedrandom');
sr.xor128 = xor128;
sr.xsadd = xsadd;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;
