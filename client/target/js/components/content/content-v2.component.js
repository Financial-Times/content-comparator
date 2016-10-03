"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var config_service_1 = require('../../services/config.service');
var ajax_service_1 = require('../../services/ajax.service');
var CONFIG = new config_service_1.default().get();
var ContentV2Component = (function () {
    function ContentV2Component(ajaxService) {
        this.ajaxService = ajaxService;
        this.label = 'Content V2 component';
    }
    ContentV2Component.prototype.ngOnInit = function () {
        var _this = this;
        this.ajaxService.get('src/mocks/test.data.mock.json')
            .map(function (response) { return response.json().testData; })
            .subscribe(function (testData) {
            _this.testData = testData;
        });
    };
    ContentV2Component = __decorate([
        core_1.Component({
            selector: 'content-v2-component',
            templateUrl: CONFIG.PATH.COMPONENTS + 'content/content-v2.component.html',
            providers: [ajax_service_1.AjaxService]
        }), 
        __metadata('design:paramtypes', [ajax_service_1.AjaxService])
    ], ContentV2Component);
    return ContentV2Component;
}());
exports.ContentV2Component = ContentV2Component;
//# sourceMappingURL=content-v2.component.js.map