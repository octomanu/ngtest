import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { ProcentualesFormComponent } from './procentuales-form/procentuales-form.component';

@Component({
  selector: 'app-tab-porcentuales',
  templateUrl: './tab-porcentuales.component.html',
  styles: [],
})
export class TabPorcentualesComponent extends TableLambe
  implements OnInit, OnDestroy {
  @Input() idConsorcio: string;
  drawerContent = ProcentualesFormComponent;
  drawerTitle = 'lambe.porcentuales';

  filtroForm = {
    razon_social: null,
    calle: null,
    numero: null,
    cuit: null,
    estado: null,
  };

  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    porcentajesConsorciosService: PorcentajesConsorciosService,
  ) {
    super(
      porcentajesConsorciosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
    this.tags = {
      razon_social: { title: 'global.razon_social', used: false },
      calle: { title: 'global.calle', used: false },
      numero: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
      estado: { title: 'global.estado', used: false },
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataService.setConsorcio(this.idConsorcio);
  }
}
