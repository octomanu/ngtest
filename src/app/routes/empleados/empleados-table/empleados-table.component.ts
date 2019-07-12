import { Component } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { Subscription, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  NzMessageService,
  NzDropdownService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { ContactosService } from '@core/http/contactos/contactos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EmpleadosFormComponent } from '../empleados-form/empleados-form.component';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styles: [],
})
export class EmpleadosTableComponent extends TableLambe {
  drawerContent = EmpleadosFormComponent;
  drawerTitle = 'lambe.empleados';

  constructor(
    empleadosService: ContactosService,
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
