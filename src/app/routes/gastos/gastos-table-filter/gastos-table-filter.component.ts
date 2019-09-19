import { Component, OnDestroy } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { GastosTableFilterForm } from './gastos-table-filter.form';
import { NzDrawerRef } from 'ng-zorro-antd';
import {
  FilterRequest,
  CloseFilterForm,
} from 'redux/gastos/filter-form/filter-form.actions';

@Component({
  selector: 'app-gastos-table-filter',
  templateUrl: './gastos-table-filter.component.html',
  styles: [],
  providers: [GastosTableFilterForm],
})
export class GastosTableFilterComponent implements OnDestroy {
  constructor(
    private store: Store<AppState>,
    public fb: GastosTableFilterForm,
    public drawerRef: NzDrawerRef,
  ) {}

  submit() {
    this.store.dispatch(new FilterRequest({ data: this.fb.form.value }));
    this.drawerRef.close();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CloseFilterForm());
  }
}
