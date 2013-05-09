// seedrandom.js
//
// Defines a new method Math.seedrandom() that, when called, substitutes
// an RC4-based algorithm for Math.random() in a way that allows explicit
// seeding.  RC4 is a cryptographic-quality fast PRNG, but this javascript
// implementation of Math.random() is about 3-10x slower than the built-in
// Math.random() because it is not native code.  So only use this function
// when you need a seedable PRNG, or when you need a PRNG that gives bits
// that are more difficult to predict than your browser's built-in linear
// congruential PRNG.
//
// Author: David Bau 1/31/2010
//
// Usage:
//
//   <script src=/web/20120305130907/http://davidbau.com/encode/seedrandom-min.js></script>
//
//   Math.seedrandom('yipee'); Sets Math.random to a PRNG closure that is
//                             initialized using the given explicit seed.
//
//   Math.seedrandom();        Sets Math.random to an ARC4-based PRNG
//                             that is seeded using the current time, dom
//                             state, event, cookie and other entropy.
//                             The generated seed string is returned.
//
//   <script src="/web/20120305130907/http://bit.ly/srandom-512"></script>
//                             Seeds using physical random bits downloaded
//                             from random.org.
//
// Examples:
//
//   Math.seedrandom("hello");            // Use "hello" as the seed.
//   document.write(Math.random());       // Always 0.5463663768140734
//   document.write(Math.random());       // Always 0.43973793770592234
//   var rng1 = Math.random;              // Remember the current prng.
//
//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
//   document.write(Math.random());       // Pretty much unpredictable.
//
//   Math.random = rng1;                  // Continue "hello" prng sequence.
//   document.write(Math.random());       // Always 0.554769432473455
//
//   Math.seedrandom(autoseed);           // Restart at the previous seed.
//   document.write(Math.random());       // Repeat the 'unpredictable' value.


// All state is inside an anonymous closure to keep the global ns clean.
/** @param {number=} denom */
(function (pool, math, width, chunks, denom){

function lowbits(n) { return n & (width - 1); }

// An ARC4 implementation
/** @constructor */
function ARC4(key) {
  var t, u, me = this, keylen = key.length;
  var i = 0, j = me.i = me.j = me.m = 0;
  me.S = [];
  me.c = [];
  while (i < width) {                   // Standard key scheduling alg
    me.S[i] = i++;
  }
  if (!keylen) key = [keylen++];        // Empty key is converted to [0]
  for (i = 0; i < width; i++) {
    t = me.S[i];
    j = lowbits(j + t + key[i % keylen]);
    u = me.S[j];
    me.S[i] = u;
    me.S[j] = t;
  }
  me.g = function getnext(bytes) {      // Returns n-byte-wide pseudorandom
    var s = me.S;
    var i = lowbits(me.i + 1); var t = s[i];
    var j = lowbits(me.j + t); var u = s[j];
    s[i] = u;
    s[j] = t;
    var r = s[lowbits(t + u)];
    while (--bytes) {
      i = lowbits(i + 1); t = s[i];
      j = lowbits(j + t); u = s[j];
      s[i] = u;
      s[j] = t;
      r = r * width + s[lowbits(t + u)];
    }
    me.i = i;
    me.j = j;
    return r;
  }
  // See /web/20120305130907/http://www.rsa.com/rsalabs/node.asp?id=2009
  me.g(width);                        // discard the initial 256 values
}

// A function to traverse an object tree and turn it into arrays.
function flatten(obj, depth) {
  var result = [];
  if (depth && typeof(obj) == 'object')
    for (var prop in obj)
      if (prop.indexOf('S') < 5)      // Avoid FF3 bug (local/sessionStorage)
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {};
  return result.length ? result : '' + obj;
}

// A function to mix a seed into a key, and shorten the seed
function mixkey(seed, key) {
  seed += '';                         // Ensure the seed is a string
  var smear = 0;
  for (var j = 0; j < seed.length; j++)
    key[lowbits(j)] =
      lowbits((smear ^= key[lowbits(j)] * 67) + seed.charCodeAt(j));
  seed = '';
  for (j in key) seed += String.fromCharCode(key[j]);
  return seed;
}

// The seedrandom function
math['seedrandom'] = function (seed) {
  var key = [];
  var arc4;

  // Flatten the seed string or build one from local entropy if needed.
  seed = mixkey(flatten(
    arguments.length ? seed : [new Date().getTime(), pool, window], 3), key);
  arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(arc4.S, pool);

  // Override Math.random.
  math['random'] = function random() {     // Closure to return a random double:
    var n = arc4.g(chunks);             // Start with a numerator <= 2 ^ 56
    var d = denom;                      //   and denominator = 2 ^ 56.
    while (n < 9007199254740992) {      // Fill 52 bit mantissa by shifting
      n = n * width + arc4.g(1);        //   more bits into the numerator
      d *= width;                       //   and denominator until n >= 2^53.
    }
    return (n == d) ? random() : n / d; // Catch rounding to 1.0 before return.
  }
  return seed;
}

// Initialize the floating point denominator
denom = math.pow(width, chunks);

// Initialize the entropy pool
mixkey(math.random(), pool);

// End anonymous scope, and pass initial values.
})(
  [],                    // entropy pool starts empty
  Math,                  // package containing random, pow, and seedrandom
  256,                   // each RC4 output is 0 <= x < 256
  7                      // seven RC4 outputs for each double
);
