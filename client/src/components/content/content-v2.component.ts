import {Component, Inject} from '@angular/core';
import ConfigService from '../../services/config.service';

import {UuidService} from '../../services/uuid.service';
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
    article: Article;
    uuid: string;

    constructor(
        private ajaxService : AjaxService,
        private uuidService: UuidService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string
    ) {
        this.article = {
            title: null,
            summary: null,
            byline: null,
            image: {},
            body: null,
            publishDateTime: null
        };
    }

    label = 'Content V2 API';

    fetch() {
        this.ajaxService.get(this.API_ENDPOINT + 'content/v2/' + this.uuid)
            .map(response => <Article> response.json())
            .subscribe(article => {
                this.article = article;
            });
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