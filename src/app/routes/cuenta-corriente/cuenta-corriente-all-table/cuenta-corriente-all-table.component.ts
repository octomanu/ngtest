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
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { CuentaCorrienteFormComponent } from '../cuenta-corriente-form/cuenta-corriente-form.component';
import { EstadoFinancieroService } from '@core/http/estado-financiero/estado-financiero.service';

@Component({
  selector: 'app-cuenta-corriente-all-table',
  templateUrl: './cuenta-corriente-all-table.component.html',
  styles: [],
})
export class CuentaCorrienteAllTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  isLoading = false;
  timeout = null;
  protected totales = {
    total: { monto: 0, titulo: 'global.total' },
    deuda: { monto: 0, titulo: 'global.deuda' },
    cheque: { monto: 0, titulo: 'global.cheque' },
    efectivo: { monto: 0, titulo: 'global.efectivo' },
    transferencia: { monto: 0, titulo: 'global.transferencia' },
    otros: { monto: 0, titulo: 'global.otros' },
  };
  protected submitForm = new Subject<{ submit: boolean }>();
  protected proveedores: { id: number; display: string }[];
  protected consorcios: { id: number; display: string }[];
  protected filtroForm = {
    id_consorcio: null,
    cc_proveedores: null,
    cc_unidades_funcionales: null,
  };

  constructor(
    protected msg: NzMessageService,
    protected translate: TranslateService,
    protected drawerService: NzDrawerService,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    estadoFinancieroService: EstadoFinancieroService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(estadoFinancieroService, nzDropdownService, breakpointObserver);
  }

  ngOnInit(): void {
    this.searchData();
    this.subscribeBreakPoint();
    this.searchProveedorList('');
    this.searchConsorciosList('');
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.paginatorParams.page = 1;
    }

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

  _openForm(id?: number) {
    const valueChangeSubscription = this.submitForm
      .asObservable()
      .subscribe(value => {
        this.searchData();
      });

    this.translate.get('global.movimiento').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        CuentaCorrienteFormComponent,
        { id: number; valueChange: Subject<{ submit: boolean }> }
      >({
        nzTitle: res,
        nzWidth: this.initialDrawerWidth,
        nzContent: CuentaCorrienteFormComponent,
        nzContentParams: { id, valueChange: this.submitForm },
      });

      this.drawerRef.afterClose.subscribe(
        (data: { submit: boolean } | undefined) => {
          if (!data) return;
          if (data.submit) this.searchData();
          valueChangeSubscription.unsubscribe();
        },
      );

      this.drawerRef.afterOpen.subscribe(data => {
        this.closeMenu();
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeBreakPoint();
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

  searchProveedorList(display: string) {
    this.proveedorService
      .searchProveedor(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.proveedores = data;
      });
  }

  searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
      });
  }
}
