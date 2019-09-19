import { Component, OnInit, OnDestroy } from '@angular/core';
import { GastosService } from '@core/http/gastos/gastos.service';
import { Observable } from 'rxjs';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { GastosForm } from './gastos.form';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { haveDues, loading } from 'redux/gastos/dues/dues.selectors';
import { DueSaveRequest } from 'redux/gastos/dues/dues.actions';
import {
  GastosPageRequest,
  ChangePageOrder,
  GastosChangePage,
} from 'redux/gastos/page/page.actions';
import * as selectors from 'redux/gastos/page/page.selectors';
import { share, tap } from 'rxjs/operators';
import { filters } from 'redux/gastos/filter-form/filter-form.selectors';
import { FilterRequest } from 'redux/gastos/filter-form/filter-form.actions';
@Component({
  selector: 'app-gastos-table',
  templateUrl: './gastos-table.component.html',
  styles: [],
  providers: [GastosForm],
})
export class GastosTableComponent implements OnInit {
  haveDues$: Observable<boolean>;
  savingDues$: Observable<boolean>;

  pageData$: Observable<any>;
  paginatorParameters$: Observable<any>;
  paginatorLoading$: Observable<any>;
  paginatorTotal$: Observable<any>;
  paginatorPage$: Observable<any>;
  paginatorPageSize$: Observable<any>;
  filters$: Observable<any>;

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
  drawerTitle: 'global.gastos';
  form: FormGroup;
  protected timeout = null;
  isLoading = false;
  protected gastosService: GastosService;
  proveedores: { id: number; display: string }[];
  consorcios: { id: number; display: string }[];
  masterFilter = { proveedor: '', consorcio: '', gasto: '' };
  selectedGastos = [];

  private filters: any;
  translations = {
    id_proveedor: 'lambe.proveedores.proveedor',
    id_consorcio: 'lambe.consorcios.consorcio',
    numero: 'global.direccion',
    cuit: 'global.cuit',
    estado: 'global.estado',
  };

  constructor(
    gastosService: GastosService,
    private store: Store<AppState>,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    protected fb: GastosForm,
  ) {
    this.gastosService = gastosService;
  }

  ngOnInit(): void {
    this.pageData$ = this.store.select(selectors.pageData).pipe(share());
    this.paginatorLoading$ = this.store.select(selectors.paginatorLoading);
    this.paginatorTotal$ = this.store.select(selectors.paginatorTotal);
    this.paginatorPage$ = this.store.select(selectors.paginatorPage);
    this.paginatorPageSize$ = this.store.select(selectors.paginatorPageSize);
    this.store.dispatch(new GastosPageRequest());
    this.filters$ = this.store
      .select(filters)
      .pipe(tap(pageFilters => (this.filters = pageFilters)));
    this.searchConsorciosList('');
    this.searchProveedorList('');
    this.haveDues$ = this.store.select(haveDues);
    this.savingDues$ = this.store.select(loading);
  }

  removeTag(tag: string) {
    this.filters[tag] = null;
    this.store.dispatch(new FilterRequest({ data: this.filters }));
  }

  pageChange(page: number) {
    this.store.dispatch(new GastosChangePage({ page }));
  }

  submit() {
    this.store.dispatch(new DueSaveRequest());
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new ChangePageOrder({ field, order }));
  }

  sort(sort: { key: string; value: string }): void {
    const field = sort.key;
    const order = sort.value ? sort.value.replace('end', '') : sort.value;
    this.changeOrder(field, order);
  }

  changeMasterFilter(filter: string, value: any) {
    this.filtroForm[filter] = value;
    if (value) {
      this.table[filter].show = false;
    } else {
      this.table[filter].show = true;
    }
    // DISTPACH CHANGE FIKLTER ACTION
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
}
