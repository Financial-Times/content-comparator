import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject"

@Injectable()
export class UuidService {
    uuid: string = 'b7b871f6-8a89-11e4-8e24-00144feabdc0';

    private _uuid = new Subject<string>();
    public uuidStream$ = this._uuid.asObservable();

    updateUuid(uuid: string){
        this.uuid = uuid;
        this.broadcastUuidChange(uuid);
    }

    broadcastUuidChange(text:string) {
        this._uuid.next(text);
    }
}