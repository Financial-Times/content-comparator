import {Injectable, Inject, Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StreamService {
    streams: Array<string> = [
        'arts',
        'books',
        'comment',
        'companies',
        'global-economy',
        'lex',
        'markets',
        'markets/commodities',
        'opinion',
        'travel',
        'world',
        'world/uk',
        'work-careers',
        'work-careers/recruitment',
        'life-arts'
    ]; //get dynamically

    streamUrl: string = 'world';
    streamUrlPattern: RegExp = new RegExp('^[a-z-/]+$');

    private _streamUrl = new Subject<string>();
    public streamUrlStream$ = this._streamUrl.asObservable();

    updateStreamUrl(stream: string) {
        this.streamUrl = stream;
        this.broadcastStreamChange(stream);
    }

    broadcastStreamChange(text:string) {
        this._streamUrl.next(text);
    }

    getStreams() {
        return this.streams.join(', ');
    }

    isValidStreamUrl(stream) {
        return this.streamUrlPattern.test(stream) && this.streams.indexOf(stream) !== -1;
    }

}