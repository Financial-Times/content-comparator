(function () {

    const CONFIG = {
        path: {
            clientSrc: 'client/src/',
            clientTarget: 'client/target/',
            tasks: 'gulp-tasks/'
        }
    };

    require('gulp-task-loader')({
        'dir': CONFIG.path.tasks,
        'config': CONFIG
    });

}());
