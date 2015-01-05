// A simple smoke test and benchmark for the generators.

var assert = require('assert');
var xor128 = require('../xor/xor128')(1);
var xsadd = require('../xor/xsadd')(1);
var xorwow = require('../xor/xorwow')(1);
var xs7 = require('../xor/xorshift7')(1);
var xor4096 = require('../xor/xor4096')(1);

describe("XOR-Shift generator test", function() {

var benchmarks = {};

function test(label, fn, double1, float3, int4, hc, qc, ec) {
  benchmarks[label] = {rand: fn, times: []};
  it("should use " + label + " correctly", function() {
    if (double1 != null) assert.equal(fn.double(), double1);
    if (float3 != null) assert.equal(fn(), float3);
    if (int4 != null) assert.equal(fn.int32(), int4);
    assert(fn() > 0);
    assert(fn() < 1);
    var h = 0, q = 0, e = 0, r;
    for (var j = 0; j < 1024; ++j) {
      r = fn();
      if (r < 0.5) h += 1;
      if (r < 0.25) q += 1;
      if (r < 0.125) e += 1;
    }
    if (hc !== null) {
      assert.equal(h, hc);
      assert.equal(q, qc);
      assert.equal(e, ec);
    }
  });
}

test("native", Math.random, null, null, null, null, null, null);
test("xor128", xor128,
    0.7963797148975774, 0.22171171731315553, 317177041, 498, 236, 110);
test("xsadd", xsadd,
    0.4690656170697256, 0.4788569991942495, -1139748236, 506, 256, 140);
test("xorwow", xorwow,
    0.8178000247146859, 0.8407576507888734, 533150816, 519, 228, 121);
test("xorshift7", xs7,
    0.21241471533241418, 0.9957620368804783, -1678071207, 510, 261, 143);
test("xor4096", xor4096,
    0.1520436450538547, 0.4206166828516871, 1312695376, 496, 241, 113);

it("runs benchmarks", function() {
  var n = 2;
  var trials = 10;
  for (var j = 0; j < trials; ++j) {
    for (var k in benchmarks) {
      var fn = benchmarks[k].rand;
      // warmup.
      for (var j = 0; j < 100000; ++j) fn();
      start = +new Date;
      // benchmark.
      for (var j = 0; j < n * 1e6; ++j) fn();
      end = +new Date;
      benchmarks[k].times.push(end - start);
    }
  }
  for (var k in benchmarks) {
    benchmarks[k].times.sort();
  }
  var nativetime = benchmarks.native.times[0];
  for (var k in benchmarks) {
    var time = benchmarks[k].times[0];
    /*
    console.log(k+ ': ' + time / n + ' nanoseconds per call, ' +
       (time / nativetime).toFixed(1) + 'x native random.');
    */
  }
});

});
