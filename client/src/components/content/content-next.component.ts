import {ViewChild, Component, Inject, ElementRef} from '@angular/core';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';
import ConfigService from '../../services/config.service';

import {UuidService} from '../../services/uuid.service';
import {ColumnHeightService} from '../../services/column-height.service';
import {AjaxService} from '../../services/ajax.service';

@Component({
  moduleId: module.id,
  selector: 'content-next-component',
  templateUrl: 'content-next-component.html',
  providers: [AjaxService]
})

export class ContentNextComponent {
    @ViewChild('column') column:ElementRef;
    @ViewChild('iframe') iframe:ElementRef;
    loaded: boolean = false;
    uuid: string;
    columnHeight: string;
    height: string;
    sanitizer: DomSanitizationService;
    iframeUrl: SafeResourceUrl;
    iframeStyle: string;
    iframeLoaded: boolean = false;

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

    loadIframe() {
        if (this.uuid) {
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/content/' + this.uuid);
        }
    }

    ngOnInit() {
        this.uuid = this.uuidService.uuid;
        this.loadIframe();

        this.uuidService.uuidStream$.subscribe(uuid => {
            const pattern = new RegExp('[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}');

            if (pattern.test(uuid) && uuid !== this.uuid) {
                this.iframeLoaded = false;
                this.iframe.nativeElement.className = 'content-next-iframe hidden';
                this.uuid = uuid;
                this.loadIframe();
            }

        });

        this.columnHeight = this.columnHeightService.height;

        this.columnHeightService.heightStream$.subscribe(height => {
            this.columnHeight = this.columnHeightService.height;
        });

        this.iframe.nativeElement.onload = () => {
            this.iframeLoaded = true;
            this.iframe.nativeElement.className = 'content-next-iframe animated zoomInUp';
        };
    }
}
