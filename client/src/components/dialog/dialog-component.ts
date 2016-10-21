import {Component, ViewChild, ElementRef} from '@angular/core';
import {DialogService} from '../../services/dialog.service';

@Component({
  moduleId: module.id,
  selector: 'dialog-component',
  templateUrl: 'dialog-component.html'
})

export class DialogComponent {
    @ViewChild('modal') modal:ElementRef;
    data: Object = {};
    header: string;

    constructor (
      private dialogService: DialogService
    ) {}

    close() {
      this.dialogService.update({});
    }

    ngOnInit() {
        this.data = this.dialogService.data;
        this.dialogService.dataStream$.subscribe(data => {
            this.data = data;
        });
    }

}