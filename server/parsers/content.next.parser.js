'use strict';

const Promise = require('promise'),
    request = require('request'),
    jsonHandler = require('../api/common/json-handler'),
    htmlparser = require('htmlparser2'),
    cheerio = require('cheerio');

function loadContent() {

    return new Promise(function (resolve, reject) {
        request({
            url: 'https://www.ft.com/content/b7b871f6-8a89-11e4-8e24-00144feabdc0'
        }, function (error, response, body) {
            if (!error) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

function handle(response) {
    return loadContent().then(content => {

        return {
            title: null,
            byline: null,
            summary: null,
            image: {},
            body: null,
            publishDateTime: null
        };
    });
}

module.exports = {
    handle: handle
};
