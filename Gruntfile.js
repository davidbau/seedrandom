module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
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

  grunt.registerTask("default", ["uglify", "qunit"]);
};

