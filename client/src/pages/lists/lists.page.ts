import {Component, Inject} from '@angular/core';
import {StreamService} from '../../services/stream.service';
import {AjaxService} from '../../services/ajax.service';
import ConfigService from '../../services/config.service';

const CONFIG = new ConfigService().get();

@Component({
    selector: 'lists',
    templateUrl: CONFIG.PATH.PAGES + 'lists/lists.page.html'
})

export class ListsPage {
    streamUrl: string;

    constructor(
        private ajaxService : AjaxService,
        private streamService: StreamService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string
    ) {}

    ngOnInit() {
        this.streamUrl = this.streamService.streamUrl;

        this.ajaxService.get(this.API_ENDPOINT + 'concept/id/' + this.streamUrl)
            .map(response => response.json())
            .subscribe(res => {
                console.warn('res', res);
            });
    }
}