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
          "xor/tychei.min.js": [ "xor/tychei.js" ],
          "xor/xor4096.min.js": [ "xor/xor4096.js" ],
          "xor/xorshift7.min.js": [ "xor/xorshift7.js" ],
          "xor/xorwow.min.js": [ "xor/xorwow.js" ],
          "xor/xsadd.min.js": [ "xor/xsadd.js" ],
          "xor/xor128.min.js": [ "xor/xor128.js" ]
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

