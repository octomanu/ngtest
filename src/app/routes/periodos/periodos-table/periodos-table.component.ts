import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NzDropdownService,
  NzMessageService,
  NzDrawerService,
} from 'ng-zorro-antd';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { PeriodosService } from '@core/http/periodos/periodos.service';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PeriodosTableFilterComponent } from '../periodos-table-filter/periodos-table-filter.component';

@Component({
  selector: 'app-periodos-table',
  templateUrl: './periodos-table.component.html',
  styles: []
})
export class PeriodosTableComponent extends TableLambe
    implements OnInit, OnDestroy {
  filtroForm = { consorcio: null};

  mapOfExpandData: { [key: string]: boolean } = {};
  periodoStatus = ['ACTIVO', 'CERRADO_PROVISORIO', 'CERRADO'];
  private periodosSevice: PeriodosService;

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    nzDropdownService: NzDropdownService,
    periodosSevice: PeriodosService,
    breakpointObserver: BreakpointObserver,
    ) {
      super(periodosService, nzDropdownService, breakpointObserver);
      this.periodosSevice = periodosService;
      this.tags = {
        razon_social: { title: 'global.razon_social', used: false },
      };
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  _openFilter() {
    this.drawerRef = this.drawerService.create<
      PeriodosTableFilterComponent,
      { formInput: PeriodosFormFields }
    >({
      nzTitle: 'lambe.proveedores.titulo',
      nzWidth: this.initialDrawerWidth,
      nzContent: ProveedorTableFilterComponent,
      nzContentParams: { formInput: this.filtroForm },
    });

    this.drawerRef.afterClose.subscribe((data: any) => {
      if (!data) return;
      this.filtroForm = data;
      this.searchData();
    });
  }

}
