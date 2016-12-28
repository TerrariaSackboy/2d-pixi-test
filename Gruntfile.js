"use strict";

module.exports = function (grunt) {
	// Configure Grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		jshint: {
			files: [
				'**/*.js',
				'!Gruntfile.js',
				'!lib/libraries/*',
				'!node_modules/**/*',
				'!dist/**/*'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		browserify: {
			default: {
				options: {
					debug: false,
					keepalive: false
				},
				files: {
					'dist/2d-pixi-test.js': [ 'lib/init.js' ]
				}
			}
		},

		watchify: {
			options: {
				debug: true,
				keepalive: true
			},
			default: {
				src: './lib/init.js',
				dest: './dist/2d-pixi-test.js'
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/2d-pixi-test.min.js': 'dist/2d-pixi-test.js'
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-watchify");

	// Register tasks
	grunt.registerTask("debug", [
		"jshint"
	]);
	grunt.registerTask("build", [
		"browserify",
		"uglify"
	]);
	grunt.registerTask("dev", [
		"watchify"
	])
};
