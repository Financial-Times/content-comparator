'use strict';

const Promise = require('promise'),
    request = require('request'),
    jsonHandler = require('../common/json-handler'),
    responder = require('../common/responder');

function fetch() {
    return new Promise(function (resolve, reject) {
        request({
            url: process.env.FT_API_URL + 'content/search/v1?apiKey=' + process.env.FT_API_KEY,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                queryString: 'a',
                queryContext: {
                    curations: ['ARTICLES']
                },
                resultContext: {
                    aspects: ['title'],
                    'maxResults': 1
                }
            })
        }, function (err, response, body) {
            if (err) {
                reject(err);
            } else {
                resolve(jsonHandler.parse(body).results[0].results[0].id);
            }
        });
    });
}

module.exports = function handleTestCall(req, response) {

    fetch().then(id => {
        responder.send(response, {
            status: 200,
            data: {
                id: id
            }
        });
    });
};

