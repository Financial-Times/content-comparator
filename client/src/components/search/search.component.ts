import {Router, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import {Component, Input, OnChanges} from '@angular/core';
import {UuidService} from '../../services/uuid.service';

@Component({
  moduleId: module.id,
  selector: 'search-component',
  templateUrl: 'search-component.html'
})

export class SearchComponent {
    uuid: string;
    legend: string;
    router: Router;

    constructor(
        private uuidService: UuidService,
        private _router: Router
    ) {
        this.router = _router;

        this.router.events.subscribe((event: NavigationEvent) => {
            if (event instanceof NavigationEnd) {
                this.legend = 'Look up ' + this.router.url.replace('/', '') + ' by UUID';
            }
        });
    }

    onUuidChange(newUuid) {
        this.uuidService.updateUuid(newUuid);
    }

    ngOnInit():any {
        this.uuid = this.uuidService.uuid;

        this.uuidService.uuidStream$.subscribe(uuid => {
            const pattern = new RegExp('[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}');

            if (pattern.test(uuid) && uuid !== this.uuid) {
                this.uuid = uuid;
            }
        });
    }
}
