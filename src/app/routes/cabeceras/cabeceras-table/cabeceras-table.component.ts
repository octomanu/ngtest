import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import * as selectors from 'redux/cabeceras/page/page.selectors';
import { Observable, Subscription } from 'rxjs';
import { NzDropdownService } from 'ng-zorro-antd';
import {
  CabecerasPageRequest,
  CabecerasChangePage,
  ChangePageOrder,
} from 'redux/cabeceras/page/page.actions';
import { CabecerasEditRequest } from 'redux/cabeceras/edit-form/edit-form.actions';
import { DeleteRequest } from 'redux/cabeceras/delete/delete.actions';
import { FilterRequest } from 'redux/cabeceras/filter-form/filter-form.actions';
import { filters } from 'redux/cabeceras/filter-form/filter-form.selectors';
import { tap, share } from 'rxjs/operators';

@Component({
  selector: 'app-cabeceras-table',
  templateUrl: './cabeceras-table.component.html',
  styles: [],
})
export class CabecerasTableComponent implements OnInit {
  initSubscription: Subscription;
  pageData$: Observable<any>;
  paginatorParameters$: Observable<any>;
  paginatorLoading$: Observable<any>;
  paginatorTotal$: Observable<any>;
  paginatorPage$: Observable<any>;
  paginatorPageSize$: Observable<any>;
  filters$: Observable<any>;

  private filters: any;
  translations = {
    cuit: 'global.cuit',
    nombre: 'global.nombre',
    direccion: 'global.direccion',
    email: 'global.email',
  };

  constructor(
    private store: Store<AppState>,
    private nzDropdownService: NzDropdownService,
  ) {}

  ngOnInit() {
    this.pageData$ = this.store.select(selectors.pageData).pipe(share());
    this.paginatorLoading$ = this.store.select(selectors.paginatorLoading);
    this.paginatorTotal$ = this.store.select(selectors.paginatorTotal);
    this.paginatorPage$ = this.store.select(selectors.paginatorPage);
    this.paginatorPageSize$ = this.store.select(selectors.paginatorPageSize);
    this.store.dispatch(new CabecerasPageRequest());
    this.filters$ = this.store
      .select(filters)
      .pipe(tap(pageFilters => (this.filters = pageFilters)));
  }

  pageChange(page: number) {
    this.store.dispatch(new CabecerasChangePage({ page }));
  }

  editar(id: number) {
    this.store.dispatch(new CabecerasEditRequest({ id }));
  }

  eliminar(id: number) {
    this.store.dispatch(new DeleteRequest({ id }));
  }

  changeOrder(field: string, order: string) {
    this.store.dispatch(new ChangePageOrder({ field, order }));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>) {
    this.nzDropdownService.create($event, template);
  }

  sort(sort: { key: string; value: string }): void {
    const field = sort.key;
    const order = sort.value ? sort.value.replace('end', '') : sort.value;
    this.changeOrder(field, order);
  }

  removeTag(tag: string) {
    this.filters[tag] = null;
    this.store.dispatch(new FilterRequest({ data: this.filters }));
  }
}
