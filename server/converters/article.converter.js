'use strict';

const Promise = require('promise'),
    jsonHandler = require('../api/common/json-handler'),
    request = require('request'),
    $ = require('cheerio');

function convert(index, element) {
    const $element = $(element),
        url = $element.attr('url');

    return new Promise((resolve, reject) => {
        request({
            url: url + '?apiKey=' + process.env.FT_API_KEY
        }, function (articleError, articleResponse, articleBody) {
            if (!articleError) {
                articleBody = jsonHandler.parse(articleBody);
                resolve({
                    element: element,
                    replacement: ' <a href="' + articleBody.webUrl + '" trackable="link">' + $(element).text() + '</a>'
                });
            } else {
                reject(articleError);
            }
        });
    });
}

module.exports = {
    convert: convert
};
