import {Injectable, Inject, Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import {AjaxService} from './ajax.service';

@Injectable()
export class UuidService {
    uuid: string = '9dcfe6b6-8bc2-11e6-8aa5-f79f5696c731';

    constructor(
        private ajaxService : AjaxService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string
    ) {
        this.fetch();
    }

    private _uuid = new Subject<string>();
    public uuidStream$ = this._uuid.asObservable();
    public randomUuidStream$ = this._uuid.asObservable();

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

    fetch() {
        this.ajaxService.get(this.API_ENDPOINT + 'newest')
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(response => {
            this.updateUuid(response.id);
        });
    }

    updateUuid(uuid: string){
        this.uuid = uuid;
        this.broadcastUuidChange(uuid);
    }

    broadcastUuidChange(text:string) {
        this._uuid.next(text);
    }
}