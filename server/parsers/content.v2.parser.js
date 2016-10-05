'use strict';

const Promise = require('promise'),
    request = require('request'),
    jsonHandler = require('../api/common/json-handler');

function handle(response) {

    function fetchImage(mainImage) {

        let image = {};

        return new Promise(function (resolve, reject) {
            request({
                url: mainImage.id + '?apiKey=' + process.env.FT_API_KEY
            }, function (imagesError, imagesResponse, imagesBody) {
                imagesBody = jsonHandler.parse(imagesBody);
                if (imagesBody && imagesBody.members) {
                    request({
                        url: imagesBody.members[0].id + '?apiKey=' + process.env.FT_API_KEY
                    }, function (imageError, imageResponse, imageBody) {
                        image = {
                            url: jsonHandler.parse(imageBody).binaryUrl
                        };
                        resolve(image);
                    });
                } else {
                    image.alt = imagesBody.message;
                    resolve(image);
                }

                if (imagesError) {
                    reject(imagesError);
                }
            });
        });
    }

    return fetchImage(response.mainImage).then(image => {
        return {
            title: response.title,
            byline: response.byline,
            summary: null,
            image: image,
            body: response.bodyXML,
            publishDateTime: response.publishedDate
        };
    });
}

module.exports = {
    handle: handle
};
