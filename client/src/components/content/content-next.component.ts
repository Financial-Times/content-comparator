import {Component, Inject} from '@angular/core';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';
import ConfigService from '../../services/config.service';

import {UuidService} from '../../services/uuid.service';
import {ColumnHeightService} from '../../services/column-height.service';
import {AjaxService} from '../../services/ajax.service';

const CONFIG = new ConfigService().get();

@Component({
  moduleId: module.id,
  selector: 'content-next-component',
  templateUrl: 'content-next-component.html',
  providers: [AjaxService]
})

export class ContentNextComponent {
    uuid: string;
    columnHeight: string;
    height: string;
    sanitizer: DomSanitizationService;
    iframeUrl: SafeResourceUrl;
    iframeStyle: string;

    constructor(
        private ajaxService : AjaxService,
        private uuidService: UuidService,
        private columnHeightService: ColumnHeightService,
        @Inject('API_ENDPOINT') private API_ENDPOINT : string,
        sanitizer: DomSanitizationService
    ) {
        this.sanitizer = sanitizer;
    }

    label = 'Content next.ft.com';

    ngOnInit() {
        this.uuid = this.uuidService.uuid;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/content/' + this.uuid);

        this.uuidService.uuidStream$.subscribe(uuid => {
            const pattern = new RegExp('[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}');

            if (pattern.test(uuid) && uuid !== this.uuid) {
                this.uuid = uuid;
                this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/content/' + this.uuid);
            }

        });

        this.columnHeight = this.columnHeightService.height;

        this.columnHeightService.heightStream$.subscribe(height => {
            this.columnHeight = this.columnHeightService.height;
        });

    }
}
