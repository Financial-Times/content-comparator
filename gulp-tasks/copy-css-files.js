(function () {

    const gulp = require('gulp'),
        copy = require('gulp-contrib-copy');

    module.exports = function () {
        return gulp.src([
            this.opts.config.path.clientSrc + '/assets/css/**/*.css'
        ]).pipe(copy()).pipe(gulp.dest(this.opts.config.path.clientTarget + '/assets/css/'));
    };
}());
