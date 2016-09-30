import {Component} from '@angular/core';
import ConfigService from '../../services/config.service';

const CONFIG = new ConfigService().get();

@Component({
    selector: 'images',
    templateUrl: CONFIG.PATH.PAGES + 'images/images.page.html'
})

export class ImagesPage {}