import {Component} from '@angular/core';
import ConfigService from '../../services/config.service';

const CONFIG = new ConfigService().get();

@Component({
    selector: 'lists',
    templateUrl: CONFIG.PATH.PAGES + 'lists/lists.page.html'
})

export class ListsPage {
}