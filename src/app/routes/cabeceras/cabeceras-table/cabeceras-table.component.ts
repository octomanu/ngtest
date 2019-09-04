import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import * as selectors from 'redux/cabeceras/cabeceras.selectors';
import { Observable, Subscription } from 'rxjs';
import {
  CabecerasPageRequest,
  CabecerasChangePage,
  ChangePageOrder,
  CabecerasEditRequest,
} from 'redux/cabeceras/cabeceras.actions';
import { NzDropdownService } from 'ng-zorro-antd';

@Component({
  selector: 'app-cabeceras-table',
  templateUrl: './cabeceras-table.component.html',
  styles: [],
})
export class CabecerasTableComponent implements OnInit, OnDestroy {
  initSubscription: Subscription;
  pageData$: Observable<any>;
  paginatorParameters$: Observable<any>;
  paginatorLoading$: Observable<any>;
  paginatorTotal$: Observable<any>;
  paginatorPage$: Observable<any>;
  paginatorPageSize$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private nzDropdownService: NzDropdownService,
  ) {}

  ngOnInit() {
    this.pageData$ = this.store.select(selectors.pageData);
    this.paginatorLoading$ = this.store.select(selectors.paginatorLoading);
    this.paginatorTotal$ = this.store.select(selectors.paginatorTotal);
    this.paginatorPage$ = this.store.select(selectors.paginatorPage);
    this.paginatorPageSize$ = this.store.select(selectors.paginatorPageSize);
    this.initSubscription = this.store
      .select(selectors.initialized)
      .subscribe(init =>
        init ? null : this.store.dispatch(new CabecerasPageRequest()),
      );
  }

  pageChange(page: number) {
    this.store.dispatch(new CabecerasChangePage({ page }));
  }

  editar(id: number) {
    this.store.dispatch(new CabecerasEditRequest({ id }));
  }

  eliminar(id: number) {
    // this.store.dispatch(new serviciosActions.DeleteServicioAction(id));
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

  ngOnDestroy() {
    this.initSubscription.unsubscribe();
  }
}
