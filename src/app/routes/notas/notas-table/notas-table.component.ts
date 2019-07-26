import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  NzDrawerService,
  NzDropdownService,
  NzMessageService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { NotasService } from '@core/http/notas/notas.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { NotasFormComponent } from '../notas-form/notas-form.component';

@Component({
  selector: 'app-notas-table',
  templateUrl: './notas-table.component.html',
  styles: [],
})
export class NotasTableComponent extends TableLambe {
  drawerContent = NotasFormComponent;
  drawerTitle = 'global.notas';

  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    notasService: NotasService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      notasService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }
}
