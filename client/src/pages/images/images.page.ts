import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import ConfigService from '../../services/config.service';
import {UuidService} from '../../services/uuid.service';
import {ImagesV1Component} from '../../components/images/images-v1.component';
import {ImagesV2Component} from '../../components/images/images-v2.component';

const CONFIG = new ConfigService().get();

@Component({
    selector: 'images',
    templateUrl: CONFIG.PATH.PAGES + 'images/images.page.html',
    directives: [
        ImagesV1Component,
        ImagesV2Component
    ]
})

export class ImagesPage {
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