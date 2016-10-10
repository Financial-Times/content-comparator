'use strict';

const Promise = require('promise'),
    jsonHandler = require('../api/common/json-handler'),
    request = require('request'),
    $ = require('cheerio');

function handlePromoBox(parent) {
    let title,
        titleElement;

    if (parent[0].name === 'promo-box') {
        const $title = parent.find('promo-title');

        title = $title.text();
        $title.replaceWith('');
    }

    if (title) {
        titleElement = `<div class="promo-title">${title}</div>`;
    } else {
        titleElement = '';
    }

    return titleElement;
}

function wrap(element, parent) {
    let title = handlePromoBox(parent);

    return `<div class="${parent[0].name}">
                ${title}
                ${element}
            </div>`;
}

function convert(index, element, mainImageUrl) {
    let $element = $(element),
        $parent = $element.parent();

    const url = $element.attr('url');

    return new Promise((resolve, reject) => {
        request({
            url: url + '?apiKey=' + process.env.FT_API_KEY
        }, function (imageMembersError, imageMembersResponse, imageMembersBody) {
            if (!imageMembersError) {
                imageMembersBody = jsonHandler.parse(imageMembersBody);

                const imageUrl = imageMembersBody.members[0].id;

                request({
                    url: imageUrl + '?apiKey=' + process.env.FT_API_KEY
                }, function (imageError, imageResponse, imageBody) {
                    imageBody = jsonHandler.parse(imageBody);

                    let replacement = '';

                    if (mainImageUrl !== imageBody.binaryUrl) {
                        replacement = `
                            <figure>
                                <div class="n-image-wrapper">
                                    <img src="${imageBody.binaryUrl}" alt="${imageBody.description}" />
                                    <figcaption>${imageBody.title}</figcaption>
                                </div>
                            </figure>
                        `;
                    }

                    while ($parent[0].name !== 'body') {
                        replacement = wrap(replacement, $element.parent());
                        $element = $element.parent();
                        $parent = $parent.parent();
                    }

                    resolve({
                        element: element,
                        replacement: replacement
                    });
                });
            } else {
                reject(imageMembersError);
            }
        });
    });
}

module.exports = {
    convert: convert
};
