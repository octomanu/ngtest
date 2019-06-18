import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { EstadoFinancieroService } from '@core/http/estado-financiero/estado-financiero.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';

@Component({
  selector: 'app-estado-financiero-table',
  templateUrl: './estado-financiero-table.component.html',
  styles: [],
})
export class EstadoFinancieroTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  @Input() protected soruce: string;
  protected isLoading = true;
  protected idConsorcio: any;
  protected idUf: string;
  protected timeout = null;
  protected consorcios: { id: number; display: string }[];
  protected ufs: { id: number; display: string }[];
  protected estadoFinancieroService: EstadoFinancieroService;
  protected saldo = 0;
  constructor(
    protected msg: NzMessageService,
    protected translate: TranslateService,
    protected drawerService: NzDrawerService,
    protected consorciosService: ConsorciosService,
    protected ufsService: UnidadesFuncionalesService,
    estadoFinancieroService: EstadoFinancieroService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
  ) {
    super(estadoFinancieroService, nzDropdownService, breakpointObserver);
    this.estadoFinancieroService = estadoFinancieroService;
  }

  ngOnInit() {
    this.dataService.setSource(this.soruce);
    this.tableLambe.loading = false;
    this.searchConsorcios('');
    this.subscribeBreakPoint();
  }
  ngOnDestroy() {
    this.unsubscribeBreakPoint();
  }

  changeConsorcio() {
    this.tableLambe.data = [];
    this.idUf = null;
    this.ufs = [];
    this.saldo = 0;
    if (!this.idConsorcio) {
      this.tableLambe.loading = false;
      return;
    }
    this.estadoFinancieroService.setSource('consorcios');
    this.estadoFinancieroService.setId(this.idConsorcio);
    this.ufsService.setConsorcio(this.idConsorcio);
    this.searchData();
    this.searchUfsList('');
  }

  changeUf() {
    if (!this.idUf) {
      this.idConsorcio = null;
      this.tableLambe.data = [];
      this.ufs = [];
      this.saldo = 0;
      return;
    }
    this.estadoFinancieroService.setSource('uf');
    this.estadoFinancieroService.setId(this.idUf);
    this.searchData();
  }

  searchUfs(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchUfsList(display);
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

  protected searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
      });
  }

  protected searchUfsList(display: string) {
    this.ufsService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.ufs = data;
      });
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.paginatorParams.page = 1;
    }

    this.tableLambe.loading = true;
    this.dataService
      .paginate(this.paginatorParams, this.filtroForm)
      .subscribe((data: any) => {
        this.tableLambe.loading = false;
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;
        this.saldo = data.totals.monto;
        for (const filtro in this.filtroForm) {
          if (
            this.filtroForm[filtro] !== null &&
            this.filtroForm[filtro] !== ''
          ) {
            this.tags[filtro].used = true;
          } else {
            this.tags[filtro].used = false;
          }
        }
      });
  }
}
