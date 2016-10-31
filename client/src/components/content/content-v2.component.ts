import {ViewChild, Component, Inject, ElementRef} from '@angular/core';
import ConfigService from '../../services/config.service';
import {Observable} from 'rxjs/Rx';

import {UuidService} from '../../services/uuid.service';
import {ColumnHeightService} from '../../services/column-height.service';
import {AjaxService} from '../../services/ajax.service';
import {Article} from '../../models/article.model';

const CONFIG = new ConfigService().get();

@Component({
  moduleId: module.id,
  selector: 'content-v2-component',
  templateUrl: 'content-component.html',
  providers: [AjaxService]
})

export class ContentV2Component {
    @ViewChild('column') column:ElementRef;

    article: Article;
    uuid: string;

    constructor(
        private ajaxService : AjaxService,
        private uuidService: UuidService,
        private columnHeightService: ColumnHeightService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string
    ) {
        this.article = {
            title: null,
            summary: null,
            byline: null,
            theme: null,
            image: {},
            body: null,
            publishDateTime: null
        };
    }

    label = 'Content V2 API';

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

    fetch() {
        if (this.uuid) {
            this.ajaxService.get(this.API_ENDPOINT + 'content/v2/' + this.uuid)
                .map(response => <Article> response.json())
                .catch(this.handleError)
                .subscribe(article => {
                    this.article = article;
                });
        }
    }

    ngAfterViewChecked() {
        setTimeout(() => {
            this.columnHeightService.updateHeight(this.column.nativeElement.offsetHeight + 'px');
        }, 1000);
    }

    ngOnInit() {
        this.uuid = this.uuidService.uuid;
        this.fetch();

        this.uuidService.uuidStream$.subscribe(uuid => {
            const pattern = new RegExp('[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}');
            if (pattern.test(uuid) && uuid !== this.uuid) {
                this.uuid = uuid;
                this.fetch();
            }
        });
    }
}