import { Component } from '@angular/core';
import { CategoriasFilterForm } from './categorias-filter.form';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { NzDrawerRef } from 'ng-zorro-antd';
import {
  FilterRequest,
  CloseFilterForm,
} from 'redux/categorias/filter-form/filter-form.actions';

@Component({
  selector: 'app-categorias-filter',
  templateUrl: './categorias-filter.component.html',
  styles: [],
  providers: [CategoriasFilterForm],
})
export class CategoriasFilterComponent {
  constructor(
    private store: Store<AppState>,
    public fb: CategoriasFilterForm,
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
