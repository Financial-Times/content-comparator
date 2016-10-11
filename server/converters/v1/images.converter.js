'use strict';

const cheerio = require('cheerio');

function replacement(img) {
    let figCaption = img.attribs.title ? `<figcaption>${img.attribs.title}</figcaption>` : '';

    return `
        <figure>
            <div class="n-image-wrapper">
                <img src="${img.attribs.src}" alt="${img.attribs.alt}" />
                ${figCaption}
            </div>
        </figure>
    `;
}

function convert(body) {
    const $ = cheerio.load(body),
        $img = $('img');

    $img.map((index, image) => {
        $(image).replaceWith(replacement(image));
    });

    return $.html();
}

module.exports = {
    convert: convert
};
