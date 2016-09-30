import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {TestData} from '../models/test.data.model';

@Injectable()
export class AjaxService {
    constructor(private http: Http) {}

    get(url) {
        return this.http.get(url);
    }
}