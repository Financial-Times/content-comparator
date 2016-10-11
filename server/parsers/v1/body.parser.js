'use strict';

const pullQuoteConverter = require('../../converters/v1/pull-quote.converter'),
    promoBoxConverter = require('../../converters/v1/promo-box.converter'),
    imagesV1Converter = require('../../converters/v1/images.converter');

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
