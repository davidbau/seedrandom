var proxyquire = require('proxyquire');
var assert = require("assert");

describe("Crypto API Test", function() {

var crypto_stub = {};
var noncrypto_sr = proxyquire('../seedrandom', { crypto: null });
var original = Math.random;

it("should be able to use noncrypto_sr('hello.')");
var rng = noncrypto_sr('hello.');
assert.equal(typeof(rng), 'function', "Should return a function.");
var r = rng();
assert.equal(r, 0.9282578795792454, "Should be 'hello.'#1");
assert(original === Math.random, "Should not change Math.random.");
assert(original !== rng, "PRNG should not be Math.random.");

// Autoseeded non-global
Math.random = original;
it("should be able to use noncrypto_sr()");
result = noncrypto_sr();
assert.equal(typeof(result), 'function', "Should return function.");
assert(original === Math.random, "Should not change Math.random.");
r = result();
it("got " + r);
assert(r != 0.9282578795792454, "Should not be 'hello.'#1");
assert(r != 0.7316977468919549, "Should not be 'hello.'#3");

});
