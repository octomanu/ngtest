import { Component, ChangeDetectorRef } from '@angular/core';
import { CreateUpdateForm } from '@core/lambe/create-update-form.class';
import { BancosForm } from './bancos.form';
import { BancosService } from '@core/http/bancos/bancos.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerRef, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-bancos-form',
  templateUrl: './bancos-form.component.html',
  styles: [],
})
export class BancosFormComponent extends CreateUpdateForm {
  constructor(
    fb: BancosForm,
    msg: NzMessageService,
    cdr: ChangeDetectorRef,
    drawerRef: NzDrawerRef<{ submit: boolean }>,
    translate: TranslateService,
    dataService: BancosService,
  ) {
    super(fb, msg, cdr, drawerRef, translate, dataService);
  }
}
