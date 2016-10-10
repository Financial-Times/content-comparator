'use strict';

const cheerio = require('cheerio');

function convert(body, asset) {
    const $ = cheerio.load(body),
        assetBody = asset.fields.body,
        footer = asset.fields.attribution,
        replacement = '<blockquote class="n-content-pullquote"><div class="n-content-pullquote__content">' + assetBody + '<footer>' +  footer + '</footer></div></blockquote>',
        $element = $('*[data-asset-name="' + asset.name + '"]');

    $element.replaceWith(replacement);

    return $.html();
}

module.exports = {
    convert: convert
};
