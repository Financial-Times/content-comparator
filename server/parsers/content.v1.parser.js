'use strict';

const moment = require('moment');

function handle(response) {
    const item = response.item,
        lifecycle = item.lifecycle,
        images = item.images,
        image = images.filter(img => {
            return img.type === 'wide-format';
        }),
        article = {
            title: item.title.title,
            summary: item.summary.excerpt,
            image: image[0],
            byline: item.editorial.byline,
            body: item.body.body,
            publishDateTime: moment(lifecycle.lastPublishDateTime || lifecycle.initialPublishDateTime).format('MMMM DD, YYYY')
        };

    return article;
}

module.exports = {
    handle: handle
};
