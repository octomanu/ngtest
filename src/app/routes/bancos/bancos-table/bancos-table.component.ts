import { Component } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { BancosFormComponent } from '../bancos-form/bancos-form.component';
import { BancosService } from '@core/http/bancos/bancos.service';
import {
  NzDropdownService,
  NzDrawerService,
  NzMessageService,
} from 'ng-zorro-antd';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bancos-table',
  templateUrl: './bancos-table.component.html',
  styles: [],
})
export class BancosTableComponent extends TableLambe {
  drawerContent = BancosFormComponent;
  drawerTitle = 'lambe.bancos';

  constructor(
    bancosService: BancosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    translate: TranslateService,
    drawerService: NzDrawerService,
    msg: NzMessageService,
  ) {
    super(
      bancosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }
}
