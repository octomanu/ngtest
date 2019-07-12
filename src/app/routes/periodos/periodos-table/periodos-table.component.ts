import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { TranslateService } from '@ngx-translate/core';
import {
  NzDrawerService,
  NzDropdownService,
  NzMessageService,
} from 'ng-zorro-antd';
import { PeriodosService } from '@core/http/periodos/periodos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PeriodosFormComponent } from '../periodos-form/periodos-form.component';

@Component({
  selector: 'app-periodos-table',
  templateUrl: './periodos-table.component.html',
  styles: [],
})
export class PeriodosTableComponent extends TableLambe {
  drawerContent = PeriodosFormComponent;
  drawerTitle = 'lambe.periodos';
  constructor(
    translate: TranslateService,
    drawerService: NzDrawerService,
    msg: NzMessageService,
    periodosService: PeriodosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      periodosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }
}
