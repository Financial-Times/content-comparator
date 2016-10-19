'use strict';

const request = require('request'),
    moment = require('moment'),
    url = require('url'),
    cheerio = require('cheerio'),
    jsonHandler = require('../common/json-handler'),
    responder = require('../common/responder');

function extractUuid(address) {
    const uuidPattern = new RegExp('^.+(?=[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})');
    return url.parse(address).path.replace(uuidPattern, '');
}

function getImageUrl(requestUrl) {
    return new Promise(function (resolve, reject) {
        request(requestUrl + '?apiKey=' + process.env.FT_API_KEY, function (error, response, body) {
            if (!error) {
                resolve(jsonHandler.parse(body));
            } else {
                reject(error);
            }
        });
    });
}

function getImage(mainImage) {
    return new Promise(function (resolve, reject) {
        request(mainImage.id + '?apiKey=' + process.env.FT_API_KEY, function (error, response, body) {
            if (!error) {
                getImageUrl(jsonHandler.parse(body).members[0].id).then(resolve);
            } else {
                reject(error);
            }
        });
    });
}

function fetchItem(itemUrl) {
    return new Promise((resolve, reject) => {
        request({
            url: itemUrl + '?apiKey=' + process.env.FT_API_KEY
        }, function (error, response, body) {
            if (!error) {
                body = jsonHandler.parse(body);
                getImage(body.mainImage).then(image => {
                    body.mainImage = Object.assign({}, body.mainImage, image);
                    resolve(body);
                });
            } else {
                reject(error);
            }
        });
    });
}

function getListTypeParam(type) {
    return 'curated' + decodeURIComponent(type).replace(/&/, '') + 'For';
}

function lookUpList(data) {
    const uuid = extractUuid(data.concordances[0].concept.id),
        listType = getListTypeParam(data.listType);

    return new Promise(function (resolve, reject) {
        request(process.env.FT_API_URL + 'lists?' + listType + '=' + uuid + '&apiKey=' + process.env.FT_API_KEY, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                body = body ? jsonHandler.parse(body) : {};

                const itemsPromises = body.items.map(item => {
                    return fetchItem(item.apiUrl);
                });

                let items = [];

                Promise.all(itemsPromises).then((promises) => {
                    promises.map((item) => {
                        item.publishedDateConverted = moment(item.publishedDate).format('MMMM MM, YYYY');
                        items.push(item);
                    });
                    resolve({
                        items: items,
                        type: data.listType,
                        title: body.title,
                        list: body
                    });
                });
            } else {
                error = error || {
                    statusMessage: 'List type of "' + listType + '" not found for stream page "' + data.stream + '"',
                    statusCode: response.statusCode
                };
                reject(error);
            }
        });
    });
}

function getUuidFromConcordances(data) {

    return new Promise(function (resolve, reject) {
        request(process.env.FT_API_URL + 'concordances?authority=http%3A%2F%2Fapi.ft.com%2Fsystem%2FFT-TME&identifierValue=' + data.conceptId + '&apiKey=' + process.env.FT_API_KEY, function (error, response, body) {
            if (!error) {
                const concordances = jsonHandler.parse(body).concordances;
                resolve({
                    concordances: concordances,
                    stream: data.stream,
                    listType: data.listType
                });
            } else {
                reject(error);
            }
        });
    });
}

function fetchContentId(stream, listType) {
    return new Promise(function (resolve, reject) {
        request(process.env.FT_WEB_URL + stream, function (error, response, body) {
            if (!error) {
                const $ = cheerio.load(body),
                    conceptId = $('html').data('concept-id');
                resolve({
                    conceptId: conceptId,
                    stream: stream,
                    listType: listType
                });
            } else {
                reject(error);
            }
        });
    });
}

module.exports = function handleConceptCall(clientRequest, clientResponse) {
    const stream = clientRequest.params.id,
        listType = clientRequest.query.listType;

    fetchContentId(stream, listType).then(getUuidFromConcordances).then(lookUpList).then(data => {
        responder.send(clientResponse, {
            status: 200,
            data: data
        });
    }).catch(error => {
        responder.reject(clientResponse, error);
    });
};
