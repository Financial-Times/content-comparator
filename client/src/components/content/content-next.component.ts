import {Component} from '@angular/core';
import ConfigService from '../../services/config.service';
import {TestData} from '../../models/test.data.model';
import {AjaxService} from '../../services/ajax.service';

const CONFIG = new ConfigService().get();

@Component({
  selector: 'content-next-component',
  templateUrl: CONFIG.PATH.COMPONENTS + 'content/content-next.component.html',
  providers: [AjaxService]
})

export class ContentNextComponent {
    testData: TestData[];

    constructor(private ajaxService : AjaxService) {

    }

    label = 'Content Next component';

    ngOnInit() {
        this.ajaxService.get('src/mocks/test.data.mock.json')
            .map(response => <TestData[]> response.json().testData)
            .subscribe(testData => {
                this.testData = testData;
            });
    }
}