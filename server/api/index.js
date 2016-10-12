'use strict';

const responder = require('./common/responder'),
    winston = require('../winston-logger'),
    apiRoutes = {
        GET: {
            content: require('./get/content'),
            concept: require('./get/concept'),
            newest: require('./get/newest'),
            test: require('./get/test')
        },
        POST: {}
    };

module.exports = new class Api {
    handle(request, response) {
        const command = request.params ? request.params.command : undefined,
            isApiRoute = request.url.indexOf('/api/') !== -1,
            requestMethod = request.method,
            routes = apiRoutes[requestMethod];

        if (isApiRoute && command) {

            if (!process.env.TEST) {
                winston.logger.info('API ' + requestMethod + ' request detected. Route: /' + command + '/');
            }

            if (routes[command]) {
                routes[command](request, response);
            } else {
                responder.reject(response);
            }

        } else {
            responder.reject(response);
        }
    }
};
