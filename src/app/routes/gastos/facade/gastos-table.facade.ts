import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import * as selectors from 'redux/gastos/page/page.selectors';
import { share, tap } from 'rxjs/operators';
import { filters } from 'redux/gastos/filter-form/filter-form.selectors';
import {
  GastosPageRequest,
  ChangePageOrder,
  GastosChangePage,
} from 'redux/gastos/page/page.actions';
import { FilterRequest } from 'redux/gastos/filter-form/filter-form.actions';

@Injectable()
export class GastosTableFacade {
  private filtersMemory: any;
  filters: Observable<any>;
  pageData: Observable<any>;
  paginatorLoading: Observable<any>;
  paginatorTotal: Observable<any>;
  paginatorPage: Observable<any>;
  paginatorPageSize: Observable<any>;
  consorcioVisible: Observable<any>;
  proveedorVisible: Observable<any>;
  servicioVisible: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.paginatorLoading = this.store.select(selectors.paginatorLoading);
    this.paginatorTotal = this.store.select(selectors.paginatorTotal);
    this.paginatorPage = this.store.select(selectors.paginatorPage);
    this.paginatorPageSize = this.store.select(selectors.paginatorPageSize);
    this.consorcioVisible = this.store.select(selectors.consorcioVisible);
    this.proveedorVisible = this.store.select(selectors.proveedorVisible);
    this.servicioVisible = this.store.select(selectors.servicioVisible);
    this.pageData = this.store.select(selectors.pageData).pipe(share());
    this.filters = this.store
      .select(filters)
      .pipe(tap(pageFilters => (this.filtersMemory = pageFilters)));
  }

  load() {
    this.store.dispatch(new GastosPageRequest());
  }

  changePage(page: number) {
    this.store.dispatch(new GastosChangePage({ page }));
  }

  order(field: string, order: string) {
    this.store.dispatch(new ChangePageOrder({ field, order }));
  }

  removeFilter(filter: string) {
    this.filtersMemory[filter] = null;
    this.store.dispatch(new FilterRequest({ data: this.filtersMemory }));
  }
}
