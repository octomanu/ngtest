import { Component } from '@angular/core';
import { SacForm } from '../sac.form';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd';
import { fadeInOut, fadeIn } from '@shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-extra-hours-tab-sac',
  templateUrl: './extra-hours-tab.component.html',
  styles: [],
  animations: [fadeInOut, fadeIn],
})
export class ExtraHoursTabComponent {
  constructor(
    public sacForm: SacForm,
    protected nzContextMenuService: NzContextMenuService,
  ) {}

  deleteRow(index: any) {
    this.sacForm.deleteHoraExtra(index);
  }

  addRow() {
    this.sacForm.newHoraExtra();
  }

  contextMenu($event: MouseEvent, template: NzDropdownMenuComponent) {
    this.nzContextMenuService.create($event, template);
  }
}
