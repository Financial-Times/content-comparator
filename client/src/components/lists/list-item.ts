import {Component, Input} from '@angular/core';
import {ListItem} from '../../models/list-item.model';

@Component({
  moduleId: module.id,
  selector: 'list-item',
  templateUrl: 'list-item.html'
})

export class ListItemComponent {
    @Input() item:ListItem;
    @Input() index:string;
    @Input() type:string;
    tag: string;

    constructor() {

    }

    ngOnInit() {
        this.tag = 'Hardcoded tag';
    }
}

