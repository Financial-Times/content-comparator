'use strict';

const url = require('url'),
    Promise = require('promise'),
    jsonHandler = require('../../api/common/json-handler'),
    request = require('request'),
    cheerio = require('cheerio');

function determineType(element) {
    const typePath = url.parse(element.attribs.type).path,
        typePathArray = typePath.split('/');

    return typePathArray[typePathArray.length - 1].toLowerCase();
}

function getImages(imageIds) {
    const actions = imageIds.map(imageId => {//eslint-disable-line one-var
        return new Promise((resolve, reject) => {
            request({
                url: imageId + '?apiKey=' + process.env.FT_API_KEY
            }, function (imageError, imageResponse, imageBody) {
                if (!imageError) {
                    imageBody = jsonHandler.parse(imageBody);
                    resolve({
                        image: imageBody
                    });
                } else {
                    reject(imageError);
                }
            });
        });
    });

    return Promise.all(actions);
}

function getImageUrls(imagesetUrls) {
    const imagesetActions = imagesetUrls.map(imagesetUrl => {//eslint-disable-line one-var
            return new Promise((resolve, reject) => {
                request({
                    url: imagesetUrl + '?apiKey=' + process.env.FT_API_KEY
                }, function (imageMembersError, imageMembersResponse, imageMembersBody) {
                    if (!imageMembersError) {
                        imageMembersBody = jsonHandler.parse(imageMembersBody);

                        imageMembersBody.members.map(imageMember => {
                            resolve(imageMember.id);
                        });

                    } else {
                        reject(imageMembersError);
                    }
                });
            });
        }),
        images = [];

    return Promise.all(imagesetActions).then(getImages).then(imagesArray => {
        imagesArray.map(imageElement => {
            const image = imageElement.image;

            images.push({
                url: image.binaryUrl,
                type: url.parse(image.type).pathname === '/ontology/content/MediaResource' ? 'Media resource' : 'unknown',
                width: image.pixelWidth,
                height: image.pixelHeight,
                alt: image.description,
                source: image.copyright ? image.copyright.notice : null
            });
        });
        return images;
    });
}

function handle(response) {
    const $ = cheerio.load(response.bodyXML),
        elements = $('ft-content'),
        imagesets = elements.filter((index, element) => {
            return determineType(element) === 'imageset';
        }),
        imagesetUrls = [];

    imagesets.map((index, imageset) => {
        imagesetUrls.push(imageset.attribs.url);
    });

    return getImageUrls(imagesetUrls);
}

module.exports = {
    handle: handle
};
