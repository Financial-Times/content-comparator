import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {APP_ROUTES, APP_ROUTING_PROVIDERS} from '../app.routing';

export const APP_PROVIDERS_CORE = [
    APP_ROUTING_PROVIDERS,
    HTTP_PROVIDERS,
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }
];