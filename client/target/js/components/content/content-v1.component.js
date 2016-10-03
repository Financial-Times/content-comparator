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
var ContentV1Component = (function () {
    function ContentV1Component(ajaxService) {
        this.ajaxService = ajaxService;
        this.label = 'Content V1 component';
        this.article = {
            title: null,
            summary: null,
            image: {},
            body: null,
            initialPublishDateTime: null,
            lastPublishDateTime: null
        };
    }
    ContentV1Component.prototype.updateArticle = function (data) {
        var article = data.item, title = article.title.title, summary = article.summary.excerpt, body = article.body.body, lifecycle = article.lifecycle, images = article.images, image = images.filter(function (image) {
            return image.type === 'wide-format';
        });
        console.warn('aaa', image);
        this.article = {
            title: title,
            summary: summary,
            image: image[0],
            body: body,
            initialPublishDateTime: lifecycle.initialPublishDateTime,
            lastPublishDateTime: lifecycle.lastPublishDateTime
        };
    };
    ContentV1Component.prototype.ngOnInit = function () {
        var _this = this;
        this.ajaxService.get('src/mocks/content.data.mock.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (contentData) {
            _this.updateArticle(contentData);
        });
    };
    ContentV1Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contentv1-component',
            templateUrl: 'content-v1.component.html',
            providers: [ajax_service_1.AjaxService]
        }), 
        __metadata('design:paramtypes', [ajax_service_1.AjaxService])
    ], ContentV1Component);
    return ContentV1Component;
}());
exports.ContentV1Component = ContentV1Component;
//# sourceMappingURL=content-v1.component.js.map