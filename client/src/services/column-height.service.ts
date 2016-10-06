import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject"

@Injectable()
export class ColumnHeightService {
    height: string = '1000px';

    private _height = new Subject<string>();
    public heightStream$ = this._height.asObservable();

    updateHeight(height: string){
        if (parseInt(height, 10) > parseInt(this.height, 10)) {
            this.height = height;
            this.broadcastHeightChange(height);
        }
    }

    broadcastHeightChange(text:string) {
        this._height.next(text);
    }
}