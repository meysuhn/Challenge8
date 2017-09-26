"use strict";
/* jshint node: true */

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
  sourceMaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
     del = require('del');


// At the end:
  // NOTE unsure if I still need this in this project. Decide at the end.
  // NOTE re. scripts task ee the link below about the HTML scripts just after the 3:00 mark. You may need to do something here.
  //see this vid https://teamtreehouse.com/library/gulp-basics/gulp-your-javascript-workflow/using-third-party-gulp-libraries
  // NOTE re. scripts task the order of .js files in the array does matter. Depending on which js file depends on another. You may need to modify the above later.

// As a developer, I should be able to run the gulp scripts command at the command line to concatenate, minify, and copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder.
gulp.task("scripts", function() {
  gulp.src([
    'js/global.js',
    'js/**/*.js'  // This is a globbing pattern, (every .js file in the js folder).
  ])
  .pipe(sourceMaps.init())
  .pipe(concat('all.min.js'))
  .pipe(sourceMaps.write('./')) // the path to where I want the source file to live (in this case, the home directory)
  .pipe(gulp.dest('dist/scripts'));
});

// Don't think the below is working.
gulp.task("minifyScrips", function() {
  gulp.src('dist/scripts/all.min.js')
  .pipe(uglify())
  .pipe(rename('app.minTest.js')) // NOTE needs to be sep file or not?
  .pipe(gulp.dest('dist/scripts'));
});
// NOTE the minify bit needs to run with concatenate

// As a developer, I should be able to run the gulp styles command at the command line to compile the project’s SCSS files into CSS. NOTE still to do: then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder.
gulp.task("styles", function() {
 gulp.src("sass/global.scss") // global.scss is there the imports are held
 .pipe(sourceMaps.init()) // creates sourcemap. This is piped to the next sass method where the sass is actually compliled
 .pipe(sass())
 .pipe(sourceMaps.write('./'))
 .pipe(gulp.dest('dist/css')); // pipe to new css folder
});




// As a developer, I should be able to run the gulp images command at the command line to optimize the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.


// Cleans away all files/folders created by Gulp.
gulp.task("clean", function() {
  del(['dist']);
});

// As a developer, I should be able to run the gulp build command at the command line to run the clean, scripts, styles, and images tasks with confidence that the clean task completes before the other commands.

gulp.task("build", ['scripts', 'styles', 'minifyScrips']);
// NOTE go back over this to complete https://teamtreehouse.com/library/gulp-basics/improving-your-gulp-task-pipelines/putting-multiple-tasks-together

// As a developer, I should be able to run the gulp command at the command line to run the build task and serve my project using a local web server.
gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
// running just the 'gulp' commaned will clear all previous gulp generated files & folders and then build up again from scratch using 'build'
// NOTE you need to work out the bit to do with watch methods

//-DONE-------------------------------------

// DONE As a developer, I should be able to run the npm install command to install all of the dependencies for the build process.
 // I think this is automatic. It's install the dependencies listed in the package.json file.

// DONE As a developer, when I run the gulp scripts or gulp styles commands at the command line, source maps are generated for the JavaScript and CSS files respectively.
 // I think this is ot be handled by the scripts and styles commands, not a separate task.

// DONE As a developer, I should be able to run the gulp clean command at the command line to delete all of the files and folders in the dist folder.

// LESSONS LEARNT
// gulpfile.js should always be in the root of the project
