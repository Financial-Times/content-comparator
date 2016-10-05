import {Component, Inject} from '@angular/core';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';
import ConfigService from '../../services/config.service';

import {UuidService} from '../../services/uuid.service';
import {AjaxService} from '../../services/ajax.service';
import {Article} from '../../models/article.model';

const CONFIG = new ConfigService().get();

@Component({
  moduleId: module.id,
  selector: 'content-next-component',
  templateUrl: 'content-next-component.html',
  providers: [AjaxService]
})

export class ContentNextComponent {
    uuid: string;
    sanitizer: DomSanitizationService;
    article: Article;
    iframeUrl: SafeResourceUrl;

    constructor(
        private ajaxService : AjaxService,
        private uuidService: UuidService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string,
        sanitizer: DomSanitizationService
    ) {

        this.article = {
            title: null,
            summary: null,
            byline: null,
            image: {},
            body: null,
            publishDateTime: null
        };

        this.sanitizer = sanitizer;
    }

    label = 'Content next.ft.com';

    ngOnInit() {
        this.uuid = this.uuidService.uuid;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/content/' + this.uuid);

        this.uuidService.uuidStream$.subscribe(uuid => {
            const pattern = new RegExp('[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}');

            if (pattern.test(uuid)) {
                console.warn('change', uuid);
                this.uuid = uuid;
                this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/content/' + this.uuid);
            }

        // this.ajaxService.get(this.API_ENDPOINT + 'content/next/b7b871f6-8a89-11e4-8e24-00144feabdc0')
        //     .map(response => <Article> response.json())
        //     .subscribe(article => {
        //         this.article = article;
        //     });
    }
}