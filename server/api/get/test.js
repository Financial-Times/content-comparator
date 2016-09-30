'use strict';

const responder = require('../common/responder');

module.exports = function handleTestCall(request, response) {
    responder.send(response, {
        status: 200
    });
};

