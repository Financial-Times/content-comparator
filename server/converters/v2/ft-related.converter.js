'use strict';

const Promise = require('promise'),
    jsonHandler = require('../../api/common/json-handler'),
    request = require('request'),
    $ = require('cheerio');

function convert(element) {
    const $element = $(element),
        imageRequestUrl = $element.find('media ft-content')[0].attribs.url,
        headlineText = $element.find('headline').text(),
        introText = $element.find('intro').text();

    return new Promise((resolve, reject) => {
        request({
            url: imageRequestUrl + '?apiKey=' + process.env.FT_API_KEY
        }, function (imageMembersError, imageMembersResponse, imageMembersBody) {
            if (!imageMembersError) {
                imageMembersBody = jsonHandler.parse(imageMembersBody);

                const imageUrl = imageMembersBody.members[0].id;

                request({
                    url: imageUrl + '?apiKey=' + process.env.FT_API_KEY
                }, function (imageError, imageResponse, imageBody) {
                    imageBody = jsonHandler.parse(imageBody);

                    resolve({
                        element: element,
                        replacement: `
                            <div class="ft-related">
                                <div class="ft-related-title">
                                    Related article
                                </div>
                                <div class="ft-related-headline">
                                    <a href="">${headlineText}</a>
                                </div>
                                <div class="ft-related-image">
                                    <figure>
                                        <div class="n-image-wrapper">
                                            <img src="${imageBody.binaryUrl}" alt="${imageBody.description}" />
                                        </div>
                                    </figure>
                                </div>
                                <div class="ft-related-intro">
                                    <p>${introText}</p>
                                </div>
                            </div>
                        `
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
