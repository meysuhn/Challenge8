"use strict";
/* jshint node: true */

var   gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
sourceMaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
       del = require('del'),
   connect = require('gulp-connect'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync').create();

gulp.task("scripts", function() {
  return gulp.src([
    'js/global.js', // NOTE is global needed here as it's covered by the line below?
    'js/**/*.js'  // This is a globbing pattern, (every .js file in the js folder).
  ])
  .pipe(sourceMaps.init())
  .pipe(concat('all.min.js'))
  .pipe(sourceMaps.write('./')) // the path to where I want the source file to live (in this case, the home directory)
  .pipe(gulp.dest('dist/scripts'));
});

// Because scripts is a dependency of minifyScripts below when the script command is run minifyScripts will run too.
gulp.task("minifyScripts", ['scripts'], function() {
  return gulp.src('dist/scripts/all.min.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/scripts'));
});

// the gulp-sass module automatically does the concatenation. It only needs the parent sass file that states the imports to do so.
gulp.task("styles", function() {
 return gulp.src("sass/global.scss") // global.scss is where the imports are held
 .pipe(sourceMaps.init()) // creates sourcemap. This is piped to the next sass method where the sass is actually compliled
 .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // option on gulp-sass module to uglify ('compress') the sass
 .pipe(rename('all.min.css'))
 .pipe(sourceMaps.write('./'))
 .pipe(gulp.dest('dist/styles')) // pipe to new css folder
 .pipe(browserSync.stream()); // Because Browsersync only cares about your CSS when it's finished compiling - make sure you call .stream() after gulp.dest
});

//The images task written in ES6 syntax.
gulp.task('images', () => {
 return gulp.src('images/*') // glob everything in the images folder
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
});

// Cleans away all files/folders created by Gulp.
gulp.task("clean", function() {
  del(['dist']);
});


// // no other tasks depend on the watch method therefore no return statement is necessary.
// gulp.task("watchFiles", function() {
//   gulp.watch('sass/**/*.scss', ['styles']); // recompile css if a file change is detected
//   //gulp.watch('js/**/*.js', ['minifyScripts']); // recompile js if a file change is detected
// });
// // NOTE browser cache problem. Not automatically showing new styles in browser. What to do? Ask community tomorrow.
// // NOTE watchFiles isn't working. Not automatic recompile.


gulp.task("build", ["clean"], function() {
  gulp.start(['minifyScripts', 'styles', 'images']);
  return gulp.src(['index.html', 'images/**', 'icons/**'], {base: './'})
    .pipe(gulp.dest('dist'));
});
// clean is first completed, then the scripts in the array are ran in the callback
// since 'scripts' is a dependency of minifyScripts it doesn't need to be stated in the build task. It will run as a result of minifyScriptsbeing run.





gulp.task("default", ["serve"], function() {
});
// running just the 'gulp' commaned will clear all previous gulp generated files & folders and then build up again from scratch using 'build'
  // clean is first completed, then build is ran in the callback


// Static Server + watching scss/html files
gulp.task('serve', ['build'], function() {
// a server will be created on port 3000 when serve is ran.
    browserSync.init({
        server: "dist"
    });

    gulp.watch("sass/*", ['build']);
    gulp.watch("*.html").on('change', browserSync.reload);
});



  // Extra Credit
  // As a developer, when I run the default gulp command, it should continuously watch for changes to any .scss file in my project. When there is a change to one of the .scss files, the gulp styles command is run and the files are compiled, concatenated, and minified to the dist folder. My project should then reload in the browser, displaying the changes.





//-DONE-------------------------------------

// DONE As a developer, I should be able to run the npm install command to install all of the dependencies for the build process.
 // I think this is automatic. It's install the dependencies listed in the package.json file.

// DONE As a developer, when I run the gulp scripts or gulp styles commands at the command line, source maps are generated for the JavaScript and CSS files respectively.
 // I think this is ot be handled by the scripts and styles commands, not a separate task.

// DONE As a developer, I should be able to run the gulp styles command at the command line to compile the project’s SCSS files into CSS then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder.

// DONE As a developer, I should be able to run the gulp images command at the command line to optimize the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.

// DONE As a developer, I should be able to run the gulp clean command at the command line to delete all of the files and folders in the dist folder.

// DONE As a developer, I should be able to run the gulp scripts command at the command line to concatenate, minify, and copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder.

// DONE As a developer, I should be able to run the gulp build command at the command line to run the clean, scripts, styles, and images tasks with confidence that the clean task completes before the other commands.

// DONE As a developer, I should be able to run the gulp command at the command line to run the build task and serve my project using a local web server.


//-LESSONS LEARNT--------------------------
// gulpfile.js should always be in the root of the project
