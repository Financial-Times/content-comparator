"use strict";
var ConfigService = (function () {
    function ConfigService() {
    }
    ConfigService.prototype.get = function () {
        var PATH_SRC = './src/';
        return {
            'PATH': {
                'COMPONENTS': PATH_SRC + 'components/',
                'PAGES': PATH_SRC + 'pages/',
                'ROOT': PATH_SRC,
                'SRC': PATH_SRC
            }
        };
    };
    return ConfigService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigService;
//# sourceMappingURL=config.service.js.map