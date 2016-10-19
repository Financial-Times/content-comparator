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

    determineTag() {
        let tag = 'Hardcoded tag';
        if (this.type === 'opinion-analysis' && parseInt(this.index, 10) === 0) {
            tag = 'Editor\'s pick';
        }
        return tag;
    }

    ngOnInit() {
        this.tag = this.determineTag();
    }
}

