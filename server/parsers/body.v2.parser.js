'use strict';

const url = require('url'),
    cheerio = require('cheerio'),
    Promise = require('promise'),
    articleConverter = require('../converters/article.converter'),
    imagesetConverter = require('../converters/imageset.v2.converter');

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

        let convert;

        switch (type) {
        case 'article':
            convert = articleConverter.convert;
            break;
        case 'imageset':
            convert = imagesetConverter.convert;
            break;
        default:
            convert = unhandledType;
            break;
        }

        return convert(index, element, mainImageUrl);
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
