"use strict";

var gulp = require('gulp');
var scp2 = require('gulp-scp2');
var sequence = require('run-sequence');

gulp.task('dev', function () {
  return gulp
    .src("dist/**")
    .pipe(
      scp2({
        // host: "223.4.73.41",
        //   host: "223.4.75.8",
          host: "223.4.74.201",
        username: "root",
        password: "%OJgzT0LKh3$",
        dest: "/usr/local/tomcat/zjfzol/sys-admin/answer"
      })
    )
    .on("error", function(err) {
      throw err;
    });
});

gulp.task('default', function (done) {
  sequence(
    'dev',
    done
  )
});
