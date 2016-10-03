"use strict";
var content_page_1 = require('./pages/content/content.page');
var lists_page_1 = require('./pages/lists/lists.page');
var images_page_1 = require('./pages/images/images.page');
exports.APP_ROUTES = [
    {
        path: 'content',
        component: content_page_1.ContentPage
    },
    {
        path: 'lists',
        component: lists_page_1.ListsPage
    },
    {
        path: 'images',
        component: images_page_1.ImagesPage
    },
    {
        path: '**',
        redirectTo: '/content',
        pathMatch: 'full'
    },
];
exports.APP_ROUTING_PROVIDERS = [];
//# sourceMappingURL=app.routing.js.map