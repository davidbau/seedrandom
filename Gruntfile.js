module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    bowercopy: {
      options: {
        clean: true
      },
      test: {
        options: {
          destPrefix: "test/lib"
        },
        files: {
          "qunit.js" : "qunit/qunit/qunit.js",
          "qunit.css" : "qunit/qunit/qunit.css",
          "require.js" : "requirejs/require.js"
        }
      }
    },
    uglify: {
      all: {
        files: {
          "<%= pkg.name %>.min.js": [ "<%= pkg.name %>.js" ],
          "prng/tychei.min.js": [ "prng/tychei.js" ],
          "prng/xor4096.min.js": [ "prng/xor4096.js" ],
          "prng/xorshift7.min.js": [ "prng/xorshift7.js" ],
          "prng/xorwow.min.js": [ "prng/xorwow.js" ],
          "prng/xor128.min.js": [ "prng/xor128.js" ]
        },
        options: {
          preserveComments: false,
          report: "min",
          beautify: {
            ascii_only: true
          }
        }
      }
    },
    sed: {
      nullchar: {
        path: "<%= pkg.name %>.min.js",
        pattern: '\\\\x00',
        replacement: '\\0'
      },
    },
    qunit: {
      options: {
        noGlobals: true
      },
      all: ["test/*.html"]
    },
    mochacov: {
      options: {
        files: ['test/cryptotest.js', 'test/nodetest.js', 'test/xortest.js']
      },
      coverage: {
        options: {
          coveralls: true
        }
      },
      test: {
        options: {
          reporter: 'dot'
        }
      }
    },
    release: {
      options: {
        bump: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-sed');

  grunt.registerTask("default", ["uglify", "sed", "qunit", "mochacov:test"]);
  grunt.registerTask("travis", ["default", "mochacov:coverage"]);
};

