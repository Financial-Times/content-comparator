(function () {
    'use strict';

    const express = require('express'),
        bodyParser = require('body-parser'),
        CONFIG = require('./server/config'),
        handlerFor404 = require('./server/404'),
        API = require('./server/api'),
        winston = require('./server/winston-logger'),
        cors = require('./server/cors'),
        authS3O = require('s3o-middleware'),
        app = express();

    function initializeServer() {
        app.use(cors);
        app.use(authS3O);
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use('/', express.static(CONFIG.APP_PATH));
    }

    (function init() {
        initializeServer();

        app.all('/api/:command', API.handle);

        app.listen(CONFIG.PORT, function () {
            winston.logger.info('[boot] Running server on port ' + CONFIG.PORT + '...');
        });

        app.use(handlerFor404);

    }());

}());
