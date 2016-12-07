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
        app = express(),
        path = require('path'),
        ftwebservice = require('express-ftwebservice');

    // Provide a way to do http requests using promises
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

    function initializeServer() {
        app.use(cors);

        ftwebservice(app, {
            manifestPath: path.join(__dirname, 'package.json'),
            about: {
                "systemCode": "content-comparator",
                "name": "Content Comparator",
                "audience": "Operations, Editorial",
                "serviceTier": "bronze",
            },

            // Always pass good to go.  If the application is running this much, then that's good enough for now.
            goodToGoTest: function() {
                return new Promise(function(resolve, reject) {
                    resolve(true);
                });
            },

            healthCheck: function() {
                return new Promise(function(resolve, reject) {
                    const testuuid = "d525b976-3153-11e5-8873-775ba7c2ea3d",
                    v1_url = process.env.FT_API_URL + process.env.FT_V1_API_ROUTE + testuuid + '?apiKey=' + process.env.FT_API_KEY,
                    v2_url = process.env.FT_API_URL + process.env.FT_V1_API_ROUTE + testuuid + '?apiKey=' + process.env.FT_API_KEY;
                    Promise.all([fetch(v1_url), fetch(v2_url)]).then(responses => {
                        var healthchecks = [];
                        responses.forEach((response, index) => {
                            const version = index + 1;
                            healthchecks.push({
                                id: 'apiv'+version,
                                name: "Can Connect to CAPI v"+version,
                                ok: (response.status == 200),
                                severity: 1,
                                businessImpact: "Can't compare to v"+version+" content",
                                technicalSummary: "Can't connect to content API v"+version+" for uuid \""+testuuid+"\".",
                                panicGuide: "Look for problems with the Content API v"+version+".  Check connectivity between this app and "+process.env.FT_API_URL + process.env['FT_V'+version+'_API_ROUTE']+". Also check for any API key changes.",
                                checkOutput: response.status,
                                lastUpdated: new Date().toISOString(),
                            });
                        });
                        resolve(healthchecks);
                    }).catch(error => {
                        resolve([{
                                id: 'unhandled-exception',
                                name: "Bad Thing Happened",
                                ok: false,
                                severity: 1,
                                businessImpact: "Can't monitor the content comparator.  Who knows what else is broken...",
                                technicalSummary: "An uncaught exception occured when trying to serve /__health.",
                                panicGuide: "Escalate to a developer.",
                                checkOutput: error.message,
                                lastUpdated: new Date().toISOString(),
                        }]);
                    });
                });
            }
        });
        app.use(authS3O);

        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use('/', express.static(CONFIG.APP_PATH));
    }

    (function init() {
        initializeServer();

        app.all('/api/:command', API.handle);
        app.all('/api/:command/:category/:id', API.handle);

        app.listen(CONFIG.PORT, function () {
            winston.logger.info('[boot] Running server on port ' + CONFIG.PORT + '...');
        });

        app.use(handlerFor404);

    }());

}());
