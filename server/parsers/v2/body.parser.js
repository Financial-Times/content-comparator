'use strict';

const cheerio = require('cheerio'),
    Promise = require('promise'),
    pullQuoteConverter = require('../../converters/v2/pull-quote.converter'),
    ftRelatedConverter = require('../../converters/v2/ft-related.converter'),
    promoBoxConverter = require('../../converters/v2/promo-box.converter'),
    ftContentParser = require('./ft-content.parser');

function handle(body, mainImageUrl) {

    const $ = cheerio.load(body),
        elements = $('ft-content, ft-related, promo-box');

    $.html(pullQuoteConverter.convert($));

    const actions = elements.map((index, element) => { //eslint-disable-line one-var
        let conversion,
            parent = $(element).parent()[0],
            grandpa = $(parent).parent()[0];

        if (element.name === 'ft-content' && (parent.name === 'body' || (parent.name === 'p' && grandpa.name === 'body'))) {
            conversion = ftContentParser.parse(index, element, mainImageUrl);
        } else if (element.name === 'ft-related') {
            conversion = ftRelatedConverter.convert(element);
        } else if (element.name === 'promo-box') {
            conversion = promoBoxConverter.convert(element);
        }

        return conversion;
    });

    return Promise.all(actions).then((promises) => {
        promises.map((o) => {
            $(o.element).replaceWith(o.replacement);
        });
        return $.html();
    }).catch(error => {
        console.error('[parsers-v2-body.parser] Error', error.statusCode);
    });
}

module.exports = {
    handle: handle
};
