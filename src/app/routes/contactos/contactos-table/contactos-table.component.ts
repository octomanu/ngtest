import { Component, OnInit } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  NzDrawerService,
  NzMessageService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { ContactosService } from '@core/http/contactos/contactos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ContactosFormComponent } from '../contactos-form/contactos-form.component';

@Component({
  selector: 'app-contactos-table',
  templateUrl: './contactos-table.component.html',
  styles: [],
})
export class ContactosTableComponent extends TableLambe {
  drawerContent = ContactosFormComponent;
  drawerTitle = 'lambe.consorcio';

  constructor(
    translate: TranslateService,
    drawerService: NzDrawerService,
    msg: NzMessageService,
    serviciosService: ContactosService,
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

  _openFilter() {}
}
