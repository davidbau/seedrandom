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
          "<%= pkg.name %>.min.js": [ "<%= pkg.name %>.js" ]
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
      all: ["test/*.html"]
    },
    release: {
      options: {
        bump: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-sed');

  grunt.registerTask("default", ["uglify", "sed", "qunit"]);
};

