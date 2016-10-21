import {UuidService} from '../services/uuid.service';
import {StreamService} from '../services/stream.service';
import {AjaxService} from '../services/ajax.service';
import {ColumnHeightService} from '../services/column-height.service';
import {DialogService} from '../services/dialog.service';

export const APP_PROVIDERS_CUSTOM = [
    AjaxService,
    StreamService,
    DialogService,
    UuidService,
    ColumnHeightService,
    {
        provide: 'API_ENDPOINT',
        useValue: window.localStorage.getItem('ApiEndpoint') || '/api/'
    }
];