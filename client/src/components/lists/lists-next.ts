import {ViewChild, Component, ElementRef} from '@angular/core';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';
import {StreamService} from '../../services/stream.service';

@Component({
    moduleId: module.id,
    selector: 'lists-next',
    templateUrl: 'lists-next.html'
})

export class ListsNextComponent {
    @ViewChild('iframe') iframe:ElementRef;
    sanitizer: DomSanitizationService;
    streamUrl: string;
    iframeUrl: SafeResourceUrl;
    iframeLoaded: boolean = false;

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
                this.iframeLoaded = false;
                this.iframe.nativeElement.className = 'lists-next-iframe hidden';
                this.streamUrl = streamUrl;
                this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ft.com/' + this.streamUrl);
            }
        });

        this.iframe.nativeElement.onload = () => {
            this.iframeLoaded = true;
            this.iframe.nativeElement.className = 'lists-next-iframe fadeIn animated';
        };
    }
}