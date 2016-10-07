import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import ConfigService from '../../services/config.service';
import {UuidService} from '../../services/uuid.service';

import {ContentV1Component} from '../../components/content/content-v1.component';
import {ContentV2Component} from '../../components/content/content-v2.component';
import {ContentNextComponent} from '../../components/content/content-next.component';

const CONFIG = new ConfigService().get();

@Component({
    selector: 'content',
    templateUrl: CONFIG.PATH.PAGES + 'content/content.page.html',
    directives: [ContentV1Component, ContentV2Component, ContentNextComponent]
})

export class ContentPage {
    routeUuid: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private uuidService: UuidService
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.routeUuid = params['id'];
        });

        if (this.routeUuid) {
            this.uuidService.noRandomize();
            this.uuidService.updateUuid(this.routeUuid);
        }
    }
}