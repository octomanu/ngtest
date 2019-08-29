import { Component } from '@angular/core';
import { IntermediateSalayForm } from '../intermediate-salary.form';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-extra-hours-tab-is',
  templateUrl: './extra-hours-tab.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class ExtraHoursTabComponent {
  constructor(
    public intermediateSalaryForm: IntermediateSalayForm,
    protected nzContextMenuService: NzContextMenuService,
  ) {}

  deleteRow(index) {
    this.intermediateSalaryForm.deleteHoraExtra(index);
  }

  addRow() {
    this.intermediateSalaryForm.newHoraExtra();
  }

  contextMenu($event: MouseEvent, template: NzDropdownMenuComponent) {
    this.nzContextMenuService.create($event, template);
  }
}
