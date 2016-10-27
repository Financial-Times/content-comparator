'use strict';

const Promise = require('promise'),
    request = require('request'),
    jsonHandler = require('../common/json-handler'),
    responder = require('../common/responder');

module.exports = function handleImagesCall(clientRequest, clientResponse) {

    const category = clientRequest.params.category,
        uuid = clientRequest.params.id,
        config = {
            'v1': {
                'url': process.env.FT_API_URL + process.env.FT_V1_API_ROUTE + uuid + '?apiKey=' + process.env.FT_API_KEY,
                'parser': require('../../parsers/v1/images.parser')
            },
            'v2': {
                'url': process.env.FT_API_URL + process.env.FT_V2_API_ROUTE + uuid + '?apiKey=' + process.env.FT_API_KEY,
                parser: require('../../parsers/v2/images.parser')
            }
        };

    function parse(response) {
        return config[category].parser.handle(response);
    }

    function fetch(url) {
        return new Promise(function (resolve, reject) {
            request(url, function (filterErr, response) {
                if (filterErr) {
                    reject(filterErr);
                } else {
                    resolve(jsonHandler.parse(response.body));
                }
            });
        });
    }

    fetch(config[category].url).then(parse).then(images => {
        responder.send(clientResponse, {
            status: 200,
            data: images
        });
    }).catch(error => {
        console.error('[api-get-images] Error', error.statusCode);
        responder.reject(clientResponse, error);
    });
};
