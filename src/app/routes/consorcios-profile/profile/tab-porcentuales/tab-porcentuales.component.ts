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

  porcentajesConsorciosService: PorcentajesConsorciosService;

  filtroForm = {
    razon_social: null,
    calle: null,
    numero: null,
    cuit: null,
    estado: null,
  };

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    porcentajesConsorciosService: PorcentajesConsorciosService,
  ) {
    super(porcentajesConsorciosService, nzDropdownService, breakpointObserver);
    this.porcentajesConsorciosService = porcentajesConsorciosService;
    this.tags = {
      razon_social: { title: 'global.razon_social', used: false },
      calle: { title: 'global.calle', used: false },
      numero: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
      estado: { title: 'global.estado', used: false },
    };
  }

  _openForm(id?: number) {
    this.translate.get('Porcentuales').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        ProcentualesFormComponent,
        { id: number }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: ProcentualesFormComponent,
        nzContentParams: { id },
      });

      this.drawerRef.afterClose.subscribe(
        (data: { submit: boolean } | undefined) => {
          if (!data) return;
          if (data.submit) this.searchData();
        },
      );

      this.drawerRef.afterOpen.subscribe(data => {
        this.closeMenu();
      });
    });
  }

  ngOnInit() {
    this.porcentajesConsorciosService.setConsorcio(this.idConsorcio);
    this.searchData();
    this.subscribeBreakPoint();
  }

  ngOnDestroy() {
    this.unsubscribeBreakPoint();
  }
}
