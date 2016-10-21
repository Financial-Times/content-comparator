import {NgModule} from '@angular/core';
import {APP_ROUTES} from './app.routing';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent}  from './app.component';
import {APP_PROVIDERS} from './app.providers';

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
    providers: APP_PROVIDERS,
    bootstrap: [AppComponent] //identifies the root component that Angular should bootstrap when it starts the application
})

export class AppModule { }
