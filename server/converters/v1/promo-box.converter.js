'use strict';

const cheerio = require('cheerio');

function convert(body, asset) {
    const $ = cheerio.load(body),
        assetTitle = asset.fields.title || 'Related article',
        assetHeadline = asset.fields.headline,
        assetHeadlineClassName = assetHeadline ? 'visible' : 'hidden',
        assetIntro = asset.fields.intro,
        assetImages = asset.fields.images,
        image = assetImages[0],
        $element = $('*[data-asset-name="' + asset.name + '"]'),
        replacement = `
            <div class="promo-box">
                <div class="promo-title">
                    ${assetTitle}
                </div>
                <div class="promo-headline ${assetHeadlineClassName}">${assetHeadline}</div>
                <div class="promo-image">
                    <img src="${image.url}" alt="${image.alt}" />
                </div>
                <div class="promo-intro">
                    ${assetIntro}
                </div>
            </div>
        `;

    $element.replaceWith(replacement);

    return $.html();
}

module.exports = {
    convert: convert
};
