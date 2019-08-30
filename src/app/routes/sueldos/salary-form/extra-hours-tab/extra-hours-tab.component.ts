import { Component, TemplateRef } from '@angular/core';
import { SalayForm } from '../salary.form';
import { NzDropdownService } from 'ng-zorro-antd';
import { fadeInOut, fadeIn } from '@shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-extra-hours-tab',
  templateUrl: './extra-hours-tab.component.html',
  styles: [],
  animations: [fadeInOut, fadeIn],
})
export class ExtraHoursTabComponent {
  constructor(
    public salaryForm: SalayForm,
    protected nzDropdownService: NzDropdownService,
  ) {}

  addRow() {
    this.salaryForm.newHoraExtra();
  }

  deleteRow(index) {
    this.salaryForm.deleteHoraExtra(index);
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.nzDropdownService.create($event, template);
  }
}
