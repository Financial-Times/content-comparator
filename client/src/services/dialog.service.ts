import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DialogService {
    data: Object = {};
    private _data = new Subject<Object>();
    public dataStream$ = this._data.asObservable();

    broadcastDataChange(data:Object) {
        this._data.next(data);
    }

    update(data) {
        this.data = data;
        this.broadcastDataChange(data);
    }
}