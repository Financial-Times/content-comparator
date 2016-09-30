import {Component} from '@angular/core';
import ConfigService from '../../services/config.service';
import {AjaxService} from '../../services/ajax.service';

import {ContentData} from '../../models/content.data.model';
import {Article} from '../../models/article.model';

const CONFIG = new ConfigService().get();

@Component({
  moduleId: module.id,
  selector: 'contentv1-component',
  templateUrl: 'content-v1.component.html',
  providers: [AjaxService]
})

export class ContentV1Component {
    contentData: ContentData;
    article: Article;

    constructor(private ajaxService : AjaxService) {
        this.article = {
            title: null,
            summary: null,
            image: {},
            body: null,
            initialPublishDateTime: null,
            lastPublishDateTime: null
        };
    }

    label = 'Content V1 component';

    updateArticle(data) {
        const article = data.item,
            title = article.title.title,
            summary = article.summary.excerpt,
            body = article.body.body,
            lifecycle = article.lifecycle,
            images = article.images,
            image = images.filter(image => {
                return image.type === 'wide-format';
            });

        console.warn('aaa', image)

        this.article = {
            title: title,
            summary: summary,
            image: image[0],
            body: body,
            initialPublishDateTime: lifecycle.initialPublishDateTime,
            lastPublishDateTime: lifecycle.lastPublishDateTime
        };
    }

    ngOnInit() {
        this.ajaxService.get('src/mocks/content.data.mock.json')
            .map(response => <ContentData> response.json())
            .subscribe(contentData => {
                this.updateArticle(contentData);
            });
    }
}