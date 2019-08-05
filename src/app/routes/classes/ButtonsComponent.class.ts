import { EventEmitter, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';

export class ButtonsComponent {
  @Input() help: boolean;
  @Input() keepHelp: boolean;
  @Input() smallViewport: boolean;
  @Output() openForm = new EventEmitter();
  drawerTitle = '';
  drawerContent: any;
  constructor(
    public translate: TranslateService,
    public drawerService: NzDrawerService,
  ) {}

  openFilter() {
    this.translate.get(this.drawerTitle).subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '50%',
        nzContent: this.drawerContent,
        nzPlacement: 'left',
      });
    });
  }

  crear() {
    this.openForm.emit();
  }
}
