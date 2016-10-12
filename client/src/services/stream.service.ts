import {Injectable, Inject, Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StreamService {
    streamUrl: string = 'world';

    private _streamUrl = new Subject<string>();
    public streamUrlStream$ = this._streamUrl.asObservable();

    updateStreamUrl(stream: string) {
        console.warn('changing stream');
        this.streamUrl = stream;
        this.broadcastStreamChange(stream);
    }

    broadcastStreamChange(text:string) {
        this._streamUrl.next(text);
    }

}