import { Component } from '@angular/core';
import { CabecerasFilterForm } from './cabeceras-filter.form';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { FilterRequest } from 'redux/cabeceras/filter-form/filter-form.actions';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-cabeceras-filter',
  templateUrl: './cabeceras-filter.component.html',
  styles: [],
  providers: [CabecerasFilterForm],
})
export class CabecerasFilterComponent {
  constructor(
    private store: Store<AppState>,
    public fb: CabecerasFilterForm,
    public drawerRef: NzDrawerRef,
  ) {}

  submit() {
    this.store.dispatch(new FilterRequest({ data: this.fb.form.value }));
    this.drawerRef.close();
  }
}
