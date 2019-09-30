import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDropdownService } from 'ng-zorro-antd';
import * as selectors from 'redux/categorias/page/page.selectors';
import { share, tap } from 'rxjs/operators';
import {
  CategoriasPageRequest,
  CategoriasChangePage,
  ChangePageOrder,
} from 'redux/categorias/page/page.actions';
import { CategoriasEditRequest } from 'redux/categorias/edit-form/edit-form.actions';
import { DeleteRequest } from 'redux/categorias/delete/delete.actions';
import { FilterRequest } from 'redux/categorias/filter-form/filter-form.actions';
import { filters } from 'redux/categorias/filter-form/filter-form.selectors';

@Component({
  selector: 'app-categorias-table',
  templateUrl: './categorias-table.component.html',
  styles: [],
})
export class CategoriasTableComponent implements OnInit {
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
    this.store.dispatch(new CategoriasPageRequest());
    this.filters$ = this.store
      .select(filters)
      .pipe(tap(pageFilters => (this.filters = pageFilters)));
  }

  pageChange(page: number) {
    this.store.dispatch(new CategoriasChangePage({ page }));
  }

  editar(id: number) {
    this.store.dispatch(new CategoriasEditRequest({ id }));
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
