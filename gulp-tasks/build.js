(function () {

    const runSequence = require('run-sequence');

    module.exports = function (callback) {
        return runSequence('copy-html-templates', 'copy-css-files', 'copy-image-files', 'compile-sass', callback);
    };

}());
