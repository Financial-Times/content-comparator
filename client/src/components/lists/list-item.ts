import {Component, Input} from '@angular/core';
import {ListItem} from '../../models/list-item.model';

@Component({
  moduleId: module.id,
  selector: 'list-item',
  templateUrl: 'list-item.html'
})

export class ListItemComponent {
    @Input() item:ListItem;
}

