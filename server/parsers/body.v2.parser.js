'use strict';

const url = require('url'),
    cheerio = require('cheerio'),
    Promise = require('promise'),
    articleConverter = require('../converters/article.converter'),
    imagesetConverter = require('../converters/imageset.converter');

function determineType(element) {
    const typePath = url.parse(element.attribs.type).path,
        typePathArray = typePath.split('/');

    return typePathArray[typePathArray.length - 1].toLowerCase();
}

function unhandledType(index, element) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                element: element,
                replacement: '<strong>' + determineType(element).toUpperCase() + ' (ft-content unhandled type) </strong>'
            });
        }, 0);
    });
}

function handle(body, mainImageUrl) {

    const $ = cheerio.load(body),
        ftElements = $('ft-content');

    let actions = ftElements.map((index, element) => {
        const type = determineType(element);

        let callback;

        switch (type) {
        case 'article':
            callback = articleConverter.convert;
            break;
        case 'imageset':
            callback = imagesetConverter.convert;
            break;
        default:
            callback = unhandledType;
            break;
        }

        return callback(index, element, mainImageUrl);
    });

    return Promise.all(actions).then((promises) => {
        promises.map((o) => {
            $(o.element).replaceWith(o.replacement);
        });

        return $.html();
    });
}

module.exports = {
    handle: handle
};
