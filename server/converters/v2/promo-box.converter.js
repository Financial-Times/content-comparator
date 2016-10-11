'use strict';

const Promise = require('promise'),
    $ = require('cheerio');

function convert(element) {
    const title = $(element).find('promo-title').text(),
        headline = $(element).find('promo-headline').html(),
        intro = $(element).find('promo-intro').html();

    return new Promise((resolve) => {
        resolve({
            'element': element,
            'replacement': `
                <div class="promo-box">
                    <div class="promo-title">${title}</div>
                    <div class="promo-headline">${headline}</div>
                    <div class="promo-intro">${intro}</div>
                </div>
            `
        });
    });
}

module.exports = {
    convert: convert
};
