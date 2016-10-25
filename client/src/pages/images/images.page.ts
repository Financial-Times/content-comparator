import {Component} from '@angular/core';
import ConfigService from '../../services/config.service';
import {ImagesV1Component} from '../../components/images/images-v1.component';
import {ImagesV2Component} from '../../components/images/images-v2.component';

const CONFIG = new ConfigService().get();

@Component({
    selector: 'images',
    templateUrl: CONFIG.PATH.PAGES + 'images/images.page.html',
    directives: [
        ImagesV1Component,
        ImagesV2Component
    ]
})

export class ImagesPage {}