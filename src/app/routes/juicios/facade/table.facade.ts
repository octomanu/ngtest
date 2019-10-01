import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDropdownService } from 'ng-zorro-antd';
import {
  JuiciosChangePage,
  JuiciosPageRequest,
  ChangePageOrder,
} from 'redux/juicios/page/page.actions';
import { JuiciosEditRequest } from 'redux/juicios/edit-form/edit-form.actions';
import * as selectors from 'redux/juicios/page/page.selectors';
import { filters } from 'redux/juicios/filter-form/filter-form.selectors';
import { tap, share } from 'rxjs/operators';
import { FilterRequest } from 'redux/juicios/filter-form/filter-form.actions';
import { DeleteRequest } from 'redux/juicios/delete/delete.actions';

@Injectable()
export class TableFacade {
  pageData$: Observable<any>;
  paginatorParameters$: Observable<any>;
  paginatorLoading$: Observable<any>;
  paginatorTotal$: Observable<any>;
  paginatorPage$: Observable<any>;
  paginatorPageSize$: Observable<any>;
  filters$: Observable<any>;
  private filters: any;

  constructor(
    private store: Store<AppState>,
    private nzDropdownService: NzDropdownService,
  ) {
    this.initObservables();
  }

  initObservables() {
    this.pageData$ = this.store.select(selectors.pageData).pipe(share());
    this.paginatorLoading$ = this.store.select(selectors.paginatorLoading);
    this.paginatorTotal$ = this.store.select(selectors.paginatorTotal);
    this.paginatorPage$ = this.store.select(selectors.paginatorPage);
    this.paginatorPageSize$ = this.store.select(selectors.paginatorPageSize);
    this.filters$ = this.store
      .select(filters)
      .pipe(tap(pageFilters => (this.filters = pageFilters)));
  }

  pageRequest() {
    this.store.dispatch(new JuiciosPageRequest());
  }

  changePage(page: number) {
    this.store.dispatch(new JuiciosChangePage({ page }));
  }

  edit(id: number) {
    this.store.dispatch(new JuiciosEditRequest({ id }));
  }

  delete(id: number) {
    this.store.dispatch(new DeleteRequest({ id }));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new ChangePageOrder({ field, order }));
  }

  openContextualMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.nzDropdownService.create($event, template);
  }

  clearFilter(filter: string) {
    this.filters[filter] = null;
    this.store.dispatch(new FilterRequest({ data: this.filters }));
  }
}
