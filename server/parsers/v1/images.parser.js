'use strict';

function handle(response) {
    return response.item.images;
}

module.exports = {
    handle: handle
};
