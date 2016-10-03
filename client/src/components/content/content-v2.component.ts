import {Component} from '@angular/core';
import ConfigService from '../../services/config.service';
import {TestData} from '../../models/test.data.model';
import {AjaxService} from '../../services/ajax.service';

const CONFIG = new ConfigService().get();

@Component({
  selector: 'content-v2-component',
  templateUrl: CONFIG.PATH.COMPONENTS + 'content/content-v2.component.html',
  providers: [AjaxService]
})

export class ContentV2Component {
    testData: TestData[];

    constructor(private ajaxService : AjaxService) {

    }

    label = 'Content V2 component';

    ngOnInit() {
        this.ajaxService.get(CONFIG.PATH.SRC + 'mocks/test.data.mock.json')
            .map(response => <TestData[]> response.json().testData)
            .subscribe(testData => {
                this.testData = testData;
            });
    }
}