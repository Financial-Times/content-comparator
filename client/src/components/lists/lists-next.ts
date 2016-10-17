import {Component} from '@angular/core';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';
import {StreamService} from '../../services/stream.service';

@Component({
    moduleId: module.id,
    selector: 'lists-next',
    templateUrl: 'lists-next.html'
})

export class ListsNextComponent {
    sanitizer: DomSanitizationService;
    streamUrl: string;
    iframeUrl: SafeResourceUrl;

    constructor(
        sanitizer: DomSanitizationService,
        private streamService: StreamService
    ) {
        this.sanitizer = sanitizer;
    }

    ngOnInit() {
        this.streamUrl = this.streamService.streamUrl;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/' + this.streamUrl);

        this.streamService.streamUrlStream$.subscribe(streamUrl => {
            if (this.streamService.isValidStreamUrl(streamUrl) && streamUrl !== this.streamUrl) {
                this.streamUrl = streamUrl;
                this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/' + this.streamUrl);
            }
        });
    }
}