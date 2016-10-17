import {Component, Inject} from '@angular/core';
import {StreamService} from '../../services/stream.service';
import {AjaxService} from '../../services/ajax.service';
import ConfigService from '../../services/config.service';
import {ListItemComponent} from '../../components/lists/list-item';
import {ListsNextComponent} from '../../components/lists/lists-next';

const CONFIG = new ConfigService().get();

@Component({
    selector: 'lists',
    templateUrl: CONFIG.PATH.PAGES + 'lists/lists.page.html',
    directives: [
        ListItemComponent,
        ListsNextComponent
    ]
})

export class ListsPage {
    streamUrl: string;
    concordances: string;
    items: Array<Object>;
    list: string;
    listType: string;
    listTypes: Array<string> = ['Top Stories', 'Opinion Analisys', 'Special Reports', 'Columnists'];
    listTypesLinks: Array<Object> = [];
    title: string;
    type: string;

    constructor(
        private ajaxService : AjaxService,
        private streamService: StreamService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string
    ) {}

    fetch() {
        this.ajaxService.get(this.API_ENDPOINT + 'lists/id/' + encodeURIComponent(this.streamUrl))
            .map(response => response.json())
            .subscribe(response => {
                console.warn('response', response);
                this.type = (response.type.split(/(?=[A-Z])/)).join().replace(/,/g, ' ');
                this.title = response.title.replace(this.type, '');
                this.items = response.items;
                this.list = JSON.stringify(response.list);
            });
    }

    ngOnInit() {
        this.listType = 'TopStories';
        this.streamUrl = this.streamService.streamUrl;
        this.fetch();

        this.streamService.streamUrlStream$.subscribe(streamUrl => {
            if (this.streamService.isValidStreamUrl(streamUrl) && streamUrl !== this.streamUrl) {
                this.streamUrl = streamUrl;
                this.fetch();
            }
        });

        this.listTypes.map((type, index) => {
            this.listTypesLinks.push({
                href: '#/lists',
                label: type,
                type: type.replace(' ', ''),
                className: 'o-buttons' + (index === 0 ? ' o-buttons--standout' : '')
            });
        });
    }
}