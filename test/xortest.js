// A simple smoke test and benchmark for the generators.

var assert = require('assert');
var xor128 = require('../xor/xor128')(1);
var xsadd = require('../xor/xsadd')(1);
var xorwow = require('../xor/xorwow')(1);
var xs7 = require('../xor/xorshift7')(1);
var xor4096 = require('../xor/xor4096')(1);
var tychei = require('../xor/tychei')(1);
var sr = require('../seedrandom')(1);

describe("XOR-Shift generator test", function() {

var benchmarks = {};

function test(label, fn, double1, float3, int4, hc, qc, ec) {
  benchmarks[label] = {rand: fn.quick || fn, times: []};
  it("should use " + label + " correctly", function() {
    if (double1 != null) assert.equal(fn.double(), double1);
    if (float3 != null) assert.equal(fn.quick(), float3);
    if (int4 != null) assert.equal(fn.int32(), int4);
    assert(fn() > 0);
    assert(fn() < 1);
    var j, h = 0, q = 0, e = 0, r, p;
    for (j = 0; j < 1024; ++j) {
      r = fn();
      if (r < 0.5) h += 1;
      if (r < 0.25) q += 1;
      if (r < 0.125) e += 1;
    }
    if (hc !== null) {
      assert.equal(h, hc);
      assert.equal(q, qc);
      assert.equal(e, ec);
      h = q = e = p = 0;
      for (j = 0; j < 1024; ++j) {
        r = fn.double();
        if (r < 0.5) h += 1;
        if (r < 0.25) q += 1;
        if (r < 0.125) e += 1;
        if (fn.int32() >= 0) p += 1;
      }
      // Sanity-check double() and int32.
      assert(h >= 480 && h <= 543, h);
      assert(q >= 226 && q <= 286, q);
      assert(e >= 100 && e <= 156, e);
      assert(p >= 482 && p <= 543, p);
    }
  });
}

test("native", Math.random, null, null, null, null, null, null);
test("xor128", xor128,
    0.7963797148975774, 0.22171171731315553, 317177041, 498, 236, 110);
test("xsadd", xsadd,
    0.9381312341394512, 0.4788569991942495, -1139748236, 506, 256, 140);
test("xorwow", xorwow,
    0.8178000247146859, 0.8407576507888734, 533150816, 519, 228, 121);
test("xorshift7", xs7,
    0.21241471533241418, 0.9957620368804783, -1678071207, 510, 261, 143);
test("xor4096", xor4096,
    0.1520436450538547, 0.4206166828516871, 1312695376, 496, 241, 113);
test("tychei", tychei,
    0.7389796587542713, 0.9962434568442404, 1808020203, 500, 252, 127);
test("seedrandom", sr,
    0.1776348083296759, 0.2160690303426236, 1397712774, 526, 282, 131);

it("runs benchmarks", function() {
  this.timeout(10000);
  this.slow(5000);
  var n = 1;
  var trials = 12;
  var fn, k, start, end, j, t;
  for (k in benchmarks) {
    fn = benchmarks[k].rand;
    // warmup.
    for (j = 0; j < 1e5; ++j) fn();
  }
  for (t = 0; t < trials; ++t) {
    for (k in benchmarks) {
      fn = benchmarks[k].rand;
      start = +new Date;
      // benchmark.
      for (j = 0; j < n * 1e5; ++j) fn();
      end = +new Date;
      benchmarks[k].times.push(end - start);
    }
  }
  for (k in benchmarks) {
    benchmarks[k].times.sort();
  }
  var nativetime = benchmarks.native.times[0];
  for (k in benchmarks) {
    var time = benchmarks[k].times[0];
    console.log(k+ ': ' + time / n + ' nanoseconds per call, ' +
       (time / nativetime).toFixed(1) + 'x native random.');
  }
});

});
