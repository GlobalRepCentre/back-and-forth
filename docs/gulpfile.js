const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");

// compile scss into css

function style() {
  return (
    gulp
      //1. Where is my scss file
      .src("./scss/**/*.scss")
      //2. Pass that file through sass compiler
      .pipe(sass().on("error", sass.logError))
      //3. Where do I save the compiled css?
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(gulp.dest("./css"))
  );
}

function watch() {
  gulp.watch("./scss/**/*.scss", style);
}

exports.style = style;
exports.watch = watch;
