import { Component } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { TranslateService } from '@ngx-translate/core';
import {
  NzMessageService,
  NzDropdownService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EmpleadosFormComponent } from '../empleados-form/empleados-form.component';
import { EmpleadosService } from '@core/http/empleados/empleados.service';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styles: [],
})
export class EmpleadosTableComponent extends TableLambe {
  drawerContent = EmpleadosFormComponent;
  drawerTitle = 'global.empleados';

  constructor(
    empleadosService: EmpleadosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    translate: TranslateService,
    drawerService: NzDrawerService,
    msg: NzMessageService,
  ) {
    super(
      empleadosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }
}
