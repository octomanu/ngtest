import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableLambe } from '@core/lambe/table-lambe.class';
import {
  NzMessageService,
  NzDrawerService,
  NzDropdownService,
} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { GastosService } from '@core/http/gastos/gastos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GastosTableFilterComponent } from '../gastos-table-filter/gastos-table-filter.component';
import { Observable } from 'rxjs';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { GastosForm } from './gastos.form';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { haveDues, loading } from 'redux/gastos/gastos.selectors';
import { GastosDueSaveRequest } from 'redux/gastos/gastos.actions';
@Component({
  selector: 'app-gastos-table',
  templateUrl: './gastos-table.component.html',
  styles: [],
  providers: [GastosForm],
})
export class GastosTableComponent extends TableLambe
  implements OnInit, OnDestroy {
  haveDues$: Observable<boolean>;
  savingDues$: Observable<boolean>;
  filtroForm = {
    id_proveedor: null,
    id_consorcio: null,
    numero: null,
    cuit: null,
    estado: null,
  };

  protected rowForm = [];

  extraData = false;
  table = {
    gasto: { show: true },
    id_proveedor: { show: true },
    id_consorcio: { show: true },
  };
  form: FormGroup;
  protected timeout = null;
  isLoading = false;
  protected gastosService: GastosService;
  proveedores: { id: number; display: string }[];
  consorcios: { id: number; display: string }[];
  masterFilter = { proveedor: '', consorcio: '', gasto: '' };
  selectedGastos = [];
  constructor(
    msg: NzMessageService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    gastosService: GastosService,
    nzDropdownService: NzDropdownService,
    breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    protected fb: GastosForm,
  ) {
    super(
      gastosService,
      nzDropdownService,
      breakpointObserver,
      translate,
      drawerService,
      msg,
    );
    this.gastosService = gastosService;
    this.tags = {
      id_proveedor: { title: 'lambe.proveedores.proveedor', used: false },
      id_consorcio: { title: 'lambe.consorcios.consorcio', used: false },
      numero: { title: 'global.direccion', used: false },
      cuit: { title: 'global.cuit', used: false },
      estado: { title: 'global.estado', used: false },
    };
  }

  ngOnInit(): void {
    // this.form = this.fb.getForm();
    this.searchData();
    this.searchConsorciosList('');
    this.searchProveedorList('');
    this.subscribeBreakPoint();
    this.haveDues$ = this.store.select(haveDues);
    this.savingDues$ = this.store.select(loading);
  }

  submit() {
    this.store.dispatch(new GastosDueSaveRequest());
  }

  ngOnDestroy(): void {
    this.unsubscribeBreakPoint();
  }

  toggleGasto(id) {
    console.log(this.selectedGastos.indexOf(id));
    if (this.selectedGastos.indexOf(id) === -1) {
      this.selectedGastos.push(id);
    } else {
      this.selectedGastos = this.selectedGastos.filter(gasto => gasto !== id);
    }
    console.log(this.selectedGastos);
  }

  _openFilter() {
    this.drawerRef = this.drawerService.create<
      GastosTableFilterComponent
      // { formInput: ChequesFormFields }
    >({
      nzTitle: 'lambe.proveedores.titulo',
      nzWidth: this.initialDrawerWidth,
      nzContent: GastosTableFilterComponent,
      nzContentParams: {
        formInput: this.filtroForm,
      },
    });

    this.drawerRef.afterClose.subscribe((data: any) => {
      if (!data) return;
      this.filtroForm = data;
      this.searchData();
    });
  }

  changeMasterFilter(filter: string, value: any) {
    this.filtroForm[filter] = value;
    if (value) {
      this.table[filter].show = false;
    } else {
      this.table[filter].show = true;
    }
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

  changeExtra(event: any) {
    console.log(event);
  }

  protected searchProveedorList(display: string) {
    this.proveedorService
      .searchByDisplay(display)
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

  // OVERRIDE
  /**
   * Busca los datos al inico y despues de aplicar filtros y orden
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.paginatorParams.page = 1;
    }

    this.tableLambe.loading = true;
    this.dataService
      .paginate(this.paginatorParams, this.filtroForm)
      .subscribe((data: any) => {
        this.tableLambe.total = data.recordsFiltered;
        this.tableLambe.data = data.data;
        console.log(data.data);
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

        // tslint:disable-next-line: forin
        for (const key in data.data) {
          this.rowForm[key] = {
            visible: false,
            // form: this.fb.getForm(),
          };
        }
        this.tableLambe.loading = false;
      });
  }
}
