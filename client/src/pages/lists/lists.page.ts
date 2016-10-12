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

    fetch() {
        this.ajaxService.get(this.API_ENDPOINT + 'concept/id/' + encodeURIComponent(this.streamUrl))
            .map(response => response.json())
            .subscribe(response => {
                console.warn('concordances', response.concordances);
                this.concordances = JSON.stringify(response.concordances);
            });
    }

    ngOnInit() {
        this.streamUrl = this.streamService.streamUrl;
        this.fetch();

        this.streamService.streamUrlStream$.subscribe(streamUrl => {
            if (this.streamService.isValidStreamUrl(streamUrl) && streamUrl !== this.streamUrl) {
                this.streamUrl = streamUrl;
                this.fetch();
            }
        });
    }
}