seedrandom.js
=============

Seeded random number generator for Javascript.

version 2.3.

Date: 2013 Dec 22

Defines a method Math.seedrandom() that, when called, substitutes
an explicitly seeded RC4-based algorithm for Math.random().  Also
supports automatic seeding from local or network sources of entropy.
Can be used as a node.js or AMD module.  Can be called with "new"
to create a local PRNG without changing Math.random.

Usage:

<pre>
&lt;script src=http://davidbau.com/encode/seedrandom-min.js&gt;&lt;/script&gt;

Math.seedrandom('yay.');  Sets Math.random to a function that is
                          initialized using the given explicit seed.

Math.seedrandom();        Sets Math.random to a function that is
                          seeded using the current time, dom state,
                          and other accumulated local entropy.
                          The generated seed string is returned.

Math.seedrandom('yowza.', true);
                          Seeds using the given explicit seed mixed
                          together with accumulated entropy.

var myrng = new Math.seedrandom('yay.');
var n = myrng();          Using "new" creates a local prng without
                          altering Math.random.

&lt;script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom"&gt;
&lt;/script&gt;                 Seeds using urandom bits from a server.

Math.seedrandom("hello.");           // Behavior is the same everywhere:
document.write(Math.random());       // Always 0.9282578795792454
document.write(Math.random());       // Always 0.3752569768646784
</pre>

When used as a module, also returns local PRNG instances:

<pre>
// With node.js:
var seedrandom = require('./seedrandom.js');
var rng = seedrandom('predictable.');
console.log(rng());                  // always 0.6646563869134212

// With require.js or other AMD loader:
require(['seedrandom'], function(seedrandom) {
  var rng = seedrandom('predictable.');
  console.log(rng());                // always 0.6646563869134212
});
</pre>

More examples:

<pre>
var seed = Math.seedrandom();        // Use prng with an automatic seed.
document.write(Math.random());       // Pretty much unpredictable x.

var rng = new Math.seedrandom(seed); // A new prng with the same seed.
document.write(rng());               // Repeat the 'unpredictable' x.

function reseed(event, count) {      // Define a custom entropy collector.
  var t = [];
  function w(e) {
    t.push([e.pageX, e.pageY, +new Date]);
    if (t.length &lt; count) { return; }
    document.removeEventListener(event, w);
    Math.seedrandom(t, true);        // Mix in any previous entropy.
  }
  document.addEventListener(event, w);
}
reseed('mousemove', 100);            // Reseed after 100 mouse moves.

The callback third arg can be used to get both the prng and the seed.
The following returns both an autoseeded prng and the seed as an object,
without mutating Math.random:

var obj = Math.seedrandom(null, false, function(prng, seed) {
  return { random: prng, seed: seed };
});
</pre>

Version notes:

The random number sequence is the same as version 1.0 for string seeds.
Version 2.0 changed the sequence for non-string seeds.
Version 2.1 speeds seeding and uses window.crypto to autoseed if present.
Version 2.2 alters non-crypto autoseeding to sweep up entropy from plugins.
Version 2.3 adds support for "new", module loading, and a null seed arg.
Version 2.3.1 adds a build environment, module packaging, and tests.

The standard ARC4 key scheduler cycles short keys, which means that
seedrandom('ab') is equivalent to seedrandom('abab') and 'ababab'.
Therefore it is a good idea to add a terminator to avoid trivial
equivalences on short string seeds, e.g., Math.seedrandom(str + '\0').
Starting with version 2.0, a terminator is added automatically for
non-string seeds, so seeding with the number 111 is the same as seeding
with '111\0'.

When seedrandom() is called with zero args or a null seed, it uses a
seed drawn from the browser crypto object if present.  If there is no
crypto support, seedrandom() uses the current time, the native rng,
and a walk of several DOM objects to collect a few bits of entropy.

Each time the one- or two-argument forms of seedrandom are called,
entropy from the passed seed is accumulated in a pool to help generate
future seeds for the zero- and two-argument forms of seedrandom.

On speed - This javascript implementation of Math.random() is several
times slower than the built-in Math.random() because it is not native
code, but that is typically fast enough.  Some details (timings on
Chrome 25 on a 2010 vintage macbook):

seeded Math.random()          - avg less than 0.0002 milliseconds per call
seedrandom('explicit.')       - avg less than 0.2 milliseconds per call
seedrandom('explicit.', true) - avg less than 0.2 milliseconds per call
seedrandom() with crypto      - avg less than 0.2 milliseconds per call

Autoseeding without crypto is somewhat slower, about 20-30 milliseconds on
a 2012 windows 7 1.5ghz i5 laptop, as seen on Firefox 19, IE 10, and Opera.
Seeded rng calls themselves are fast across these browsers, with slowest
numbers on Opera at about 0.0005 ms per seeded Math.random().

LICENSE (BSD):

Copyright 2013 David Bau, all rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in the
     documentation and/or other materials provided with the distribution.

  3. Neither the name of this module nor the names of its contributors may
     be used to endorse or promote products derived from this software
     without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

