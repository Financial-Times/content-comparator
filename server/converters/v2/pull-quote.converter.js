'use strict';

function convert($) {
    const $pullQuotes = $('pull-quote');

    let replacement;

    $pullQuotes.map((index, element) => {
        const text = $(element).find('pull-quote-text').text(),
            source = $(element).find('pull-quote-source').text();

        replacement = `<blockquote class="n-content-pullquote">
            <div class="n-content-pullquote__content">
                <p>${text}</p>
                <footer>${source}</footer>
            </div>
        </blockquote>`;

        $(element).replaceWith(replacement);
    });
}

module.exports = {
    convert: convert
};
