'use strict';

const Promise = require('promise'),
    jsonHandler = require('../../api/common/json-handler'),
    request = require('request'),
    $ = require('cheerio');

function convert(index, element, mainImageUrl) {

    const url = $(element).attr('url');

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
                    const copyrightsNotice = imageBody.copyright ? imageBody.copyright.notice : '',
                        imageTitle = imageBody.title;
                    let replacement = '';

                    if (mainImageUrl !== imageBody.binaryUrl) {
                        replacement = `
                            <figure>
                                <div class="n-image-wrapper">
                                    <img src="${imageBody.binaryUrl}" alt="${imageBody.description}" />
                                    <figcaption>${imageTitle} ${copyrightsNotice}</figcaption>
                                </div>
                            </figure>
                        `;
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
