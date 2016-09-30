(function () {

    const gulp = require('gulp');

    function reportChange(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }

    function watchSassFiles(opts) {
        gulp.watch([
            opts.config.path.clientSrc + '**/*.scss'
        ], ['compile-sass']).on('change', reportChange);
    }

    function watchHtmlFiles(opts) {
        gulp.watch([
            opts.config.path.clientSrc + '**/*.html'
        ], ['copy-html-templates']).on('change', reportChange);
    }

    module.exports = function () {
        return [
            watchHtmlFiles(this.opts),
            watchSassFiles(this.opts)
        ];
    };

}());