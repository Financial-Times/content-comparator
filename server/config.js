'use strict';

const fs = require('fs-extra'),
    PACKAGE_JSON = require('../package.json');

(function init() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

    if (fs.existsSync('.env.json')) {//eslint-disable-line no-sync
        require('dot-env');
    }
}());

module.exports = {
    PORT: process.env.PORT || 4000,
    APP: PACKAGE_JSON.name,
    APP_PATH: './client'
};


