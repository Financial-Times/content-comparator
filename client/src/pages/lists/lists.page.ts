import {ViewChild, Component, Inject, ElementRef} from '@angular/core';
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
    @ViewChild('list') listsContent:ElementRef;

    streamUrl: string;
    concordances: string;
    error: Object;
    items: Array<Object>;
    list: string;
    listType: string;
    listTypes: Array<string> = ['Top Stories', 'Opinion Analisys', 'Special Reports', 'Columnists'];
    listTypesLinks: Array<Object> = [];
    title: string;
    type: string;
    loading: boolean;

    constructor(
        private ajaxService : AjaxService,
        private streamService: StreamService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string
    ) {
        console.warn('lists', this.listsContent)
    }

    convertType(type) {
        return type.replace(/ /g,'');
    }

    changeType(type) {
        this.listType = this.convertType(type);
        this.updateListTypeButtons();
        this.fetch();
    }

    fetchSuccess(response) {
        this.type = (response.type.split(/(?=[A-Z])/)).join().replace(/,/g, ' ');
        this.title = response.title.replace(this.type, '');
        this.items = response.items;
        this.list = JSON.stringify(response.list);
        this.loading = false;
        this.listsContent.nativeElement.className = 'lists-content zoomInUp animated';
    }

    fetchError(error) {
        console.warn('Error:', error);
        this.loading = false;
        this.list = null;
        this.items = [];
        if (error._body && typeof error._body !== 'string') {
            error._body = "Request timeout...";
        }
        this.error = error;
        this.listsContent.nativeElement.className = 'lists-content hidden';
    }

    fetch() {
        this.loading = true;
        this.ajaxService.get(this.API_ENDPOINT + 'lists/id/' + encodeURIComponent(this.streamUrl) + '?listType=' + this.listType)
            .map(response => response.json())
            .subscribe(response => {
                this.error = null;
                this.fetchSuccess(response);
            }, error => {
                this.fetchError(error);
            });
    }

    updateListTypeButtons() {
        this.listTypesLinks = [];
        this.listsContent.nativeElement.className = 'lists-content hidden';
        this.listTypes.map((type, index) => {
            const typeConverted = this.convertType(type);
            this.listTypesLinks.push({
                href: '#/lists',
                label: type,
                type: typeConverted,
                className: 'o-buttons' + (typeConverted === this.listType ? ' o-buttons--standout' : '')
            });
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

        this.updateListTypeButtons();
    }
}