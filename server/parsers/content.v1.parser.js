'use strict';

const datetimeParser = require('./datetime.parser');

function handle(response) {
    const item = response.item,
        lifecycle = item.lifecycle,
        images = item.images.filter(img => {
            return img.type === 'wide-format';
        }),
        article = {
            title: item.title.title,
            summary: item.summary.excerpt,
            image: images.length ? {
                url: images[0].url,
                alt: images[0].alt,
                title: images[0].caption,
                copyright: '&copy; ' + images[0].source
            } : {},
            byline: item.editorial.byline,
            body: item.body.body,
            publishDateTime: datetimeParser.handle(lifecycle.lastPublishDateTime || lifecycle.initialPublishDateTime)
        };
    return article;
}

module.exports = {
    handle: handle
};
