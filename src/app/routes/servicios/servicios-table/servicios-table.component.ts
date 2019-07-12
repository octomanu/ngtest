import { Component } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { TranslateService } from '@ngx-translate/core';
import {
  NzDrawerService,
  NzMessageService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ServiciosFormComponent } from '../servicios-form/servicios-form.component';

@Component({
  selector: 'app-servicios-table',
  templateUrl: './servicios-table.component.html',
  styles: [],
})
export class ServiciosTableComponent extends TableLambe {
  drawerContent = ServiciosFormComponent;
  drawerTitle = 'lambe.servicios';
  constructor(
    translate: TranslateService,
    drawerService: NzDrawerService,
    msg: NzMessageService,
    serviciosService: ServiciosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      serviciosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }
}
