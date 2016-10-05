'use strict';

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
            publishDateTime: lifecycle.lastPublishDateTime || lifecycle.initialPublishDateTime
        };

    return article;
}

module.exports = {
    handle: handle
};
