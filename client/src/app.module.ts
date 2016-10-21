import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent}  from './app.component';
import {APP_ROUTES, APP_ROUTING_PROVIDERS} from './app.routing';
import {UuidService} from './services/uuid.service';
import {StreamService} from './services/stream.service';
import {AjaxService} from './services/ajax.service';
import {ColumnHeightService} from './services/column-height.service';
import {DialogService} from './services/dialog.service';

import {SearchComponent} from './components/search/search.component';
import {DialogComponent} from './components/dialog/dialog-component';

import {ContentPage} from './pages/content/content.page';
import {ListsPage} from './pages/lists/lists.page';
import {ImagesPage} from './pages/images/images.page';


@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES),
        FormsModule
    ], //the other modules that export material we need in this module. Almost every application's root module should import the BrowserModule
    declarations: [
        AppComponent,
        SearchComponent,
        DialogComponent,
        ContentPage,
        ListsPage,
        ImagesPage
    ], //components and directives that belong to this module
    providers: [
        APP_ROUTING_PROVIDERS,
        HTTP_PROVIDERS,
        AjaxService,
        StreamService,
        DialogService,
        UuidService,
        ColumnHeightService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: 'API_ENDPOINT',
            useValue: window.localStorage.getItem('ApiEndpoint') || '/api/'
        }
    ],
    bootstrap: [AppComponent] //identifies the root component that Angular should bootstrap when it starts the application
})

export class AppModule { }
