var assert = require('assert');
var xs7 = require('../lib/xorshift7');

describe('xorshift7 string seeds (#84)', function() {
  it('uses every character of short seeds', function() {
    var seen = {};
    ['', 'a', 'b', 'hi', 'oh no', 'hello.', '1234567'].forEach(function(seed) {
      var state = JSON.stringify(xs7(seed, { state: true }).state());
      assert(!seen[state], 'seed collision for ' + JSON.stringify(seed));
      seen[state] = true;
    });
  });

  it('uses each of the first seven characters of longer seeds', function() {
    var seed = 'abcdefghijk';
    var original = xs7(seed, { state: true }).state();
    for (var i = 0; i < 7; ++i) {
      var changed = seed.slice(0, i) + 'X' + seed.slice(i + 1);
      assert.notDeepEqual(xs7(changed, { state: true }).state(), original);
    }
  });

  it('distinguishes Unicode characters in short seeds', function() {
    assert.notDeepEqual(xs7('\u0001', { state: true }).state(),
        xs7('\u2001', { state: true }).state());
  });

  it('reproduces a string seed and restores a saved state', function() {
    var first = xs7('hello.', { state: true });
    var second = xs7('hello.');
    for (var i = 0; i < 10; ++i) assert.equal(first(), second());
    var saved = first.state();
    var restored = xs7('different', { state: saved });
    assert.equal(first.double(), restored.double());
    assert.equal(first.int32(), restored.int32());
    assert.equal(first.quick(), restored.quick());
    assert.deepEqual(restored.state(), first.state());
  });
});
