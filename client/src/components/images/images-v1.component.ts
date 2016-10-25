import {Component, Inject} from '@angular/core';

import {UuidService} from '../../services/uuid.service';
import {ColumnHeightService} from '../../services/column-height.service';
import {AjaxService} from '../../services/ajax.service';

@Component({
    moduleId: module.id,
    selector: 'images-v1',
    templateUrl: 'images.html'
})

export class ImagesV1Component {
    version: string = 'V1';
    uuid: string;
    images: Array<Object>;
    loading: boolean;

    constructor(
        private ajaxService : AjaxService,
        private uuidService: UuidService,
        private columnHeightService: ColumnHeightService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string
    ) {
        this.loading = true;
    }

    fetch() {
        this.loading = true;
        this.ajaxService.get(this.API_ENDPOINT + 'images/v1/' + this.uuid)
            .map(response => response.json())
            .subscribe(images => {
                this.images = images;
                this.loading = false;
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