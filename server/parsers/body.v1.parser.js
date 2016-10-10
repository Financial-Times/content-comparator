'use strict';

const pullQuoteConverter = require('../converters/pull-quote.v1.converter'),
    promoBoxConverter = require('../converters/promo-box.v1.converter'),
    imagesV1Converter = require('../converters/images.v1.converter');

function convert(body, asset) {
    let converter;

    switch (asset.type) {
    case 'pullQuote':
        converter = pullQuoteConverter;
        break;
    case 'promoBox':
        converter = promoBoxConverter;
        break;
    default:
        break;
    }

    if (converter) {
        body = converter.convert(body, asset);
    }

    return body;
}

function handle(body, assets) {
    assets.map(asset => {
        body = convert(body, asset);
    });

    body = imagesV1Converter.convert(body);

    return body;
}

module.exports = {
    handle: handle
};
