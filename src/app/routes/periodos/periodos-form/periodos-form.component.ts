import { Component, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CreateUpdateForm } from '@core/lambe/create-update-form.class';
import { PeriodosForm } from './periodos.form';
import { PeriodosService } from '@core/http/periodos/periodos.service';

@Component({
  selector: 'app-periodos-form',
  templateUrl: './periodos-form.component.html',
  styles: [],
})
export class PeriodosFormComponent extends CreateUpdateForm {
  constructor(
    fb: PeriodosForm,
    msg: NzMessageService,
    cdr: ChangeDetectorRef,
    drawerRef: NzDrawerRef<{ submit: boolean }>,
    translate: TranslateService,
    dataService: PeriodosService,
  ) {
    super(fb, msg, cdr, drawerRef, translate, dataService);
  }
}
