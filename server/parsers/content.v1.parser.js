'use strict';

const datetimeParser = require('./datetime.parser'),
    bodyV1parser = require('./body.v1.parser');

function handle(response) {

    const item = response.item,
        lifecycle = item.lifecycle,
        metadata = item.metadata,
        theme = metadata.primaryTheme ? metadata.primaryTheme.term.name : null,
        images = item.images.filter(img => {
            return img.type === 'wide-format';
        }),
        assets = response.item.assets,
        article = {
            title: item.title.title,
            summary: item.summary.excerpt,
            theme: theme,
            image: images.length ? {
                url: images[0].url,
                alt: images[0].alt,
                title: images[0].caption,
                copyright: '&copy; ' + images[0].source
            } : {},
            byline: item.editorial.byline,
            body: bodyV1parser.handle(item.body.body, assets),
            publishDateTime: datetimeParser.handle(lifecycle.lastPublishDateTime || lifecycle.initialPublishDateTime)
        };
    return article;
}

module.exports = {
    handle: handle
};
