'use strict';

const request = require('request'),
    cheerio = require('cheerio'),
    jsonHandler = require('../common/json-handler'),
    responder = require('../common/responder');

function getUuidFromConcordances(conceptId) {
    return new Promise(function (resolve, reject) {
        request(process.env.FT_API_URL + 'concordances?authority=http%3A%2F%2Fapi.ft.com%2Fsystem%2FFT-TME&identifierValue=' + conceptId + '&apiKey=' + process.env.FT_API_KEY, function (error, response, body) {
            if (!error) {
                resolve(jsonHandler.parse(body).concordances);
            } else {
                reject(error);
            }
        });
    });
}

function fetchContentId(stream) {
    return new Promise(function (resolve, reject) {
        request(process.env.FT_WEB_URL + stream, function (error, response, body) {
            if (!error) {
                const $ = cheerio.load(body),
                    conceptId = $('html').data('concept-id');
                resolve(conceptId);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = function handleConceptCall(clientRequest, clientResponse) {
    const stream = clientRequest.params.id;

    fetchContentId(stream).then(getUuidFromConcordances).then(concordances => {
        responder.send(clientResponse, {
            status: 200,
            data: {
                concordances: concordances
            }
        });
    }).catch(error => {
        responder.reject(clientResponse, {
            error: error
        });
    });
};
