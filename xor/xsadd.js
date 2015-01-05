// A Javascript implementaion of the "xsadd" prng algorithm by
// Mutsuo Saito and Makoto Matsumoto

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var t = me.s0;
    t ^= t << 15;
    t ^= t >>> 18;
    t ^= me.s3 << 11
    me.s0 = me.s1;
    me.s1 = me.s2;
    me.s2 = me.s3;
    me.s3 = t;
    return (me.s2 + t) | 0;
  };

  function init(me, seed) {
    var j, S = [0, 0, 0, 0], zeroes;
    if (seed === seed | 0) {
      S[0] = seed;
      seed = null;
    } else {
      // TODO: implement array seeding.
    }
    for (j = 1; j < 8; ++j) {
      if (S[j & 3] ^= j + imul(1812433253,
          S[(j - 1) & 3] ^ S[(j - 1) & 3] >>> 30)) zeroes = 0; else ++zeroes;
    }
    if (zeroes >= 4) {
      console.log('oops');
      S = [88, 83, 65, 68];
    }
    me.s0 = S[0];
    me.s1 = S[1];
    me.s2 = S[2];
    me.s3 = S[3];

    // Discard an initial 8 values.
    for (j = 8; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  t.s3 = f.s3;
  return t;
};

function imulFill(a, b) {
  var ah  = (a >>> 16) & 0xffff;
  var al = a & 0xffff;
  var bh  = (b >>> 16) & 0xffff;
  var bl = b & 0xffff;
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
}
var imul = Math.imul || imulFill;

function impl(seed, opts) {
  if (!seed) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / ((1 << 30) * 4); };
  prng.double = function() {
    // Use the shift seen in xsadd.c
    var top = xg.next() >>> 5,
        bot = (xg.next() >>> 0) / ((1 << 30) * 4),
        result = (top + bot) / (1 << 28);
    return result;
  };
  prng.int32 = xg.next;
  if (state) {
    if (state.s0) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  prng.int32 = xg.next;
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xsadd = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);


