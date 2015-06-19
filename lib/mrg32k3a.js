// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.s10 = 0;
  me.s11 = 0;
  me.s12 = 0;
  me.s20 = 0;
  me.s21 = 0;
  me.s22 = 0;

  // Set up generator function.
  me.next = function() {
    var m1 = 4294967087;
    var m2 = 4294944443;
    var a12 = 1403580;
    var a13n = 810728;
    var a21 = 527612;
    var a23n = 1370589;

    var k, p1, p2;

    /* Component 1 */
    p1 = a12 * me.s11 - a13n * me.s10;
    k = p1 / m1 | 0;
    p1 -= k * m1;
    if (p1 < 0) p1 += m1;
    me.s10 = me.s11;
    me.s11 = me.s12;
    me.s12 = p1;

    /* Component 2 */
    p2 = a21 * me.s22 - a23n * me.s20;
    k = p2 / m2 | 0;
    p2 -= k * m2;
    if (p2 < 0) p2 += m2;
    me.s20 = me.s21;
    me.s21 = me.s22;
    me.s22 = p2;

    /* Combination */
    if (p1 <= p2) return p1 - p2 + m1;
    else return p1 - p2;
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.s10 = f.s10;
  t.s11 = f.s11;
  t.s12 = f.s12;
  t.s20 = f.s20;
  t.s21 = f.s21;
  t.s22 = f.s22;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / ((1 << 30) * 4); };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / ((1 << 30) * 4),
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);


