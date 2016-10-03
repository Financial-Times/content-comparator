import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {APP_ROUTES, APP_ROUTING_PROVIDERS} from './app.routing';

import {ContentPage} from './pages/content/content.page';
import {ListsPage} from './pages/lists/lists.page';
import {ImagesPage} from './pages/images/images.page';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES)
    ], //the other modules that export material we need in this module. Almost every application's root module should import the BrowserModule
    declarations: [
        AppComponent,
        ContentPage,
        ListsPage,
        ImagesPage
    ], //components and directives that belong to this module
    providers: [APP_ROUTING_PROVIDERS, { provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent] //identifies the root component that Angular should bootstrap when it starts the application
})

export class AppModule { }
