import {Component, Input, OnChanges} from '@angular/core';
import {UuidService} from '../../services/uuid.service';

@Component({
  moduleId: module.id,
  selector: 'search-component',
  templateUrl: 'search-component.html'
})

export class SearchComponent {
    uuid: string;

    constructor(
        private uuidService: UuidService
    ) {}

    onUuidChange(newUuid) {
        this.uuidService.updateUuid(newUuid);
    }

    ngOnInit():any {
        this.uuid = this.uuidService.uuid;
    }
}
