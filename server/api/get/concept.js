'use strict';

const request = require('request'),
    url = require('url'),
    cheerio = require('cheerio'),
    jsonHandler = require('../common/json-handler'),
    responder = require('../common/responder');

function extractUuid(address) {
    const uuidPattern = new RegExp('^.+(?=[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})');
    return url.parse(address).path.replace(uuidPattern, '');
}

function lookUpList(concordances) {
    const uuid = extractUuid(concordances[0].concept.id);

    return new Promise(function (resolve, reject) {
        request(process.env.FT_API_URL + 'lists?curatedTopStoriesFor=' + uuid + '&apiKey=' + process.env.FT_API_KEY, function (error, response, body) {
            if (!error) {
                resolve({
                    concordances: concordances,
                    lists: jsonHandler.parse(body)
                });
            } else {
                reject(error);
            }
        });
    });
}

function getUuidFromConcordances(conceptId) {
    return new Promise(function (resolve, reject) {
        request(process.env.FT_API_URL + 'concordances?authority=http%3A%2F%2Fapi.ft.com%2Fsystem%2FFT-TME&identifierValue=' + conceptId + '&apiKey=' + process.env.FT_API_KEY, function (error, response, body) {
            if (!error) {
                const concordances = jsonHandler.parse(body).concordances;
                resolve(concordances);
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

    fetchContentId(stream).then(getUuidFromConcordances).then(lookUpList).then(data => {
        responder.send(clientResponse, {
            status: 200,
            data: data
        });
    }).catch(error => {
        responder.reject(clientResponse, {
            error: error
        });
    });
};
