import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GastosForm } from './gastos.form';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
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
  pageData$: Observable<any>;
  paginatorParameters$: Observable<any>;
  paginatorLoading$: Observable<any>;
  paginatorTotal$: Observable<any>;
  paginatorPage$: Observable<any>;
  paginatorPageSize$: Observable<any>;
  filters$: Observable<any>;

  consorcioVisible$: Observable<boolean>;
  proveedorVisible$: Observable<boolean>;
  servicioVisible$: Observable<boolean>;
  extraData = false;
  private filters: any;
  translations = {
    id_proveedor: 'lambe.proveedores.proveedor',
    id_consorcio: 'lambe.consorcios.consorcio',
    numero: 'global.direccion',
    cuit: 'global.cuit',
    estado: 'global.estado',
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.pageData$ = this.store.select(selectors.pageData).pipe(share());
    this.paginatorLoading$ = this.store.select(selectors.paginatorLoading);
    this.paginatorTotal$ = this.store.select(selectors.paginatorTotal);
    this.paginatorPage$ = this.store.select(selectors.paginatorPage);
    this.paginatorPageSize$ = this.store.select(selectors.paginatorPageSize);
    this.consorcioVisible$ = this.store.select(selectors.consorcioVisible);
    this.proveedorVisible$ = this.store.select(selectors.proveedorVisible);
    this.servicioVisible$ = this.store.select(selectors.servicioVisible);

    this.store.dispatch(new GastosPageRequest());
    this.filters$ = this.store
      .select(filters)
      .pipe(tap(pageFilters => (this.filters = pageFilters)));
  }

  removeTag(tag: string) {
    this.filters[tag] = null;
    this.store.dispatch(new FilterRequest({ data: this.filters }));
  }

  pageChange(page: number) {
    this.store.dispatch(new GastosChangePage({ page }));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new ChangePageOrder({ field, order }));
  }

  sort(sort: { key: string; value: string }): void {
    const field = sort.key;
    const order = sort.value ? sort.value.replace('end', '') : sort.value;
    this.changeOrder(field, order);
  }
}
