import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { GastosRecurrentesService } from '@core/http/gastos-recurrentes/gastos-recurrentes.service';
import {
  NzDropdownService,
  NzMessageService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { GastosRecurrentesFormComponent } from '../gastos-recurrentes-form/gastos-recurrentes-form.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gastos-recurrentes-table',
  templateUrl: './gastos-recurrentes-table.component.html',
  styles: [],
})
export class GastosRecurrentesTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  drawerContent = GastosRecurrentesFormComponent;
  drawerTitle = 'lambe.gastos-recurrentes';
  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    gastosRecurrentesService: GastosRecurrentesService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      gastosRecurrentesService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }
}
