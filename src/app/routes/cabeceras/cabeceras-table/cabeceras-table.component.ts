import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { CabecerasFormComponent } from '../cabeceras-form/cabeceras-form.component';

@Component({
  selector: 'app-cabeceras-table',
  templateUrl: './cabeceras-table.component.html',
  styles: [],
})
export class CabecerasTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  drawerContent = CabecerasFormComponent;
  drawerTitle = 'lambe.cabeceras';
  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    cabecerasService: CabecerasService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      cabecerasService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }
}
