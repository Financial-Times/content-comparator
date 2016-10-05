import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AjaxService {
    constructor(private http: Http) {}

    get(url) {
        return this.http.get(url);
    }
}
