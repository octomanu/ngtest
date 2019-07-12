import { Component, ChangeDetectorRef } from '@angular/core';
import { CreateUpdateForm } from '@core/lambe/create-update-form.class';
import { EmpleadosForm } from './empleados.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { EmpleadosService } from '@core/http/empleados/empleados.service';

@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styles: [],
})
export class EmpleadosFormComponent extends CreateUpdateForm {
  constructor(
    fb: EmpleadosForm,
    msg: NzMessageService,
    cdr: ChangeDetectorRef,
    drawerRef: NzDrawerRef<{ submit: boolean }>,
    translate: TranslateService,
    dataService: EmpleadosService,
  ) {
    super(fb, msg, cdr, drawerRef, translate, dataService);
  }
}
