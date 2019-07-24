import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import { Subject } from 'rxjs';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CuentaCorrienteService } from '@core/http/cuenta-corriente/cuenta-corriente.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { CuentaCorrienteFormComponent } from '../cuenta-corriente-form/cuenta-corriente-form.component';

@Component({
  selector: 'app-cuenta-corriente-table',
  templateUrl: './cuenta-corriente-table.component.html',
  styles: [],
})
export class CuentaCorrienteTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  drawerContent = CuentaCorrienteFormComponent;
  drawerTitle = 'global.movimiento';
  totales = {
    total: { monto: 0, titulo: 'global.total' },
    deuda: { monto: 0, titulo: 'global.deuda' },
    cheque: { monto: 0, titulo: 'global.cheque' },
    efectivo: { monto: 0, titulo: 'global.efectivo' },
    transferencia: { monto: 0, titulo: 'global.transferencia' },
    otros: { monto: 0, titulo: 'global.otros' },
  };
  isLoading = false;
  protected timeout = null;
  proveedores: { id: number; display: string }[];
  consorcios: { id: number; display: string }[];
  filtroForm = {
    cc_consorcios: null,
    cc_proveedores: null,
    cc_unidades_funcionales: null,
  };

  constructor(
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    cuentaCorrienteService: CuentaCorrienteService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(
      cuentaCorrienteService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.searchProveedorList('');
    this.searchConsorciosList('');
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.paginatorParams.page = 1;
    }

    //BORRAR
    this.totales.deuda.monto = 0;
    this.totales.total.monto = 0;
    this.totales.cheque.monto = 0;
    this.totales.efectivo.monto = 0;
    this.totales.transferencia.monto = 0;
    this.totales.otros.monto = 0;

    this.tableLambe.loading = false;
    this.tableLambe.total = 0;
    this.tableLambe.data = [];
    return;
    //BORRAR

    this.tableLambe.loading = true;
    this.dataService
      .paginate(this.paginatorParams, this.filtroForm)
      .subscribe((data: any) => {
        this.totales.deuda.monto = data.totals.deuda ? data.totals.deuda : 0;
        this.totales.total.monto = data.totals.total ? data.totals.total : 0;
        this.totales.cheque.monto = data.totals.cheque ? data.totals.cheque : 0;
        this.totales.efectivo.monto = data.totals.efectivo
          ? data.totals.efectivo
          : 0;
        this.totales.transferencia.monto = data.totals.transferencia
          ? data.totals.transferencia
          : 0;
        this.totales.otros.monto = data.totals.otros ? data.totals.otros : 0;

        this.tableLambe.loading = false;
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;
      });
  }

  changeCuentaCorrienteConfig() {
    this.searchData();
  }

  searchProveedores(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchProveedorList(display);
    }, 400);
  }

  searchConsorcios(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchConsorciosList(display);
    }, 400);
  }

  _openFilter() {}

  protected searchProveedorList(display: string) {
    this.proveedorService
      .searchProveedor(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.proveedores = data;
      });
  }

  protected searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
      });
  }
}
