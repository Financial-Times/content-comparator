import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContentPage} from './pages/content/content.page';
import {ListsPage} from './pages/lists/lists.page';
import {ImagesPage} from './pages/images/images.page';

export const APP_ROUTES: Routes = [
    {
        path: 'content/:id',
        component: ContentPage
    },
    {
        path: 'content',
        component: ContentPage
    },
    {
        path: 'lists',
        component: ListsPage
    },
    {
        path: 'images',
        component: ImagesPage
    },
    {
        path: '**',
        redirectTo: '/content',
        pathMatch: 'full'
    },
];

export const APP_ROUTING_PROVIDERS: any[] = [];