import {ViewChild, Component, Inject, ElementRef} from '@angular/core';
import ConfigService from '../../services/config.service';

import {UuidService} from '../../services/uuid.service';
import {ColumnHeightService} from '../../services/column-height.service';
import {AjaxService} from '../../services/ajax.service';
import {Article} from '../../models/article.model';

const CONFIG = new ConfigService().get();

@Component({
  moduleId: module.id,
  selector: 'contentv1-component',
  templateUrl: 'content-component.html',
  providers: [AjaxService]
})

export class ContentV1Component {
    @ViewChild('column') column:ElementRef;

    article: Article;
    uuid: string;
    columnHeightTriggered: boolean;

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

    label = 'Content V1 API';

    fetch() {
        this.ajaxService.get(this.API_ENDPOINT + 'content/v1/' + this.uuid)
            .map(response => <Article> response.json())
            .subscribe(article => {
                this.article = article;
            });
    }

    ngAfterViewChecked() {
        if (!this.columnHeightTriggered) {
            this.columnHeightTriggered = true;
            setTimeout(() => {
                this.columnHeightService.updateHeight(this.column.nativeElement.offsetHeight + 'px');
                this.columnHeightTriggered = false;
            }, 500);
        }
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