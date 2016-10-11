'use strict';

const url = require('url'),
    ROOT_PATH = process.env.APP_PATH,
    ftContentArticleConverter = require(ROOT_PATH + '/converters/v2/ft-content-article.converter'),
    ftContentImagesetConverter = require(ROOT_PATH + '/converters/v2/ft-content-imageset.converter');

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

function parse(index, element, mainImageUrl) {
    const type = determineType(element);
    let convert;

    switch (type) {
    case 'article':
        convert = ftContentArticleConverter.convert;
        break;
    case 'imageset':
        convert = ftContentImagesetConverter.convert;
        break;
    default:
        convert = unhandledType;
        break;
    }

    return convert(index, element, mainImageUrl);
}

module.exports = {
    parse: parse
};
