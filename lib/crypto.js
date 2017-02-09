// browser crypto, used in browserify instead of shimming node's crypto package

(function(global, module, define) {


function randomBytes(width) {
  var out = new Uint8Array(width);
  (global.crypto || global.msCrypto).getRandomValues(out);
  return out;
}

var impl = { randomBytes: randomBytes }

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.crypto = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);


