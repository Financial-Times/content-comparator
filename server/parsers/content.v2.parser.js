'use strict';

const Promise = require('promise'),
    request = require('request'),
    jsonHandler = require('../api/common/json-handler'),
    datetimeParser = require('./datetime.parser');

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
                        imageBody = jsonHandler.parse(imageBody);
                        image = {
                            url: imageBody.binaryUrl,
                            alt: imageBody.description,
                            title: imageBody.title,
                            copyright: imageBody.copyright
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

    function getArticle(image) {
        return {
            title: response.title,
            byline: response.byline,
            summary: response.standfirst,
            image: image,
            body: response.bodyXML,
            publishDateTime: datetimeParser.handle(response.publishedDate)
        };
    }

    function getArticleWithImage() {
        return fetchImage(response.mainImage).then(image => {
            return getArticle(image);
        });
    }

    function getArticleWithoutImage() {
        return getArticle({});
    }

    return response.mainImage ? getArticleWithImage() : getArticleWithoutImage();
}

module.exports = {
    handle: handle
};
