import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { filters } from 'redux/gastos/filter-form/filter-form.selectors';
import { first } from 'rxjs/operators';
import { FilterRequest } from 'redux/gastos/filter-form/filter-form.actions';

@Injectable()
export class TableConfigFacade {
  constructor(private store: Store<AppState>) {}

  proveedorVisibility(id: boolean) {
    this.store
      .select(filters)
      .pipe(first())
      .subscribe((filtersData: any) => {
        this.store.dispatch(
          new FilterRequest({
            data: { ...filtersData, ['gastos-id_proveedor']: id },
          }),
        );
      });
  }

  consorcioVisibility(id: boolean) {
    this.store
      .select(filters)
      .pipe(first())
      .subscribe((filtersData: any) => {
        this.store.dispatch(
          new FilterRequest({
            data: { ...filtersData, ['gastos-id_consorcio']: id },
          }),
        );
      });
  }

  servicioVisibility(id: boolean) {
    this.store
      .select(filters)
      .pipe(first())
      .subscribe((filtersData: any) => {
        this.store.dispatch(
          new FilterRequest({
            data: { ...filtersData, ['gastos-id_servicio']: id },
          }),
        );
      });
  }
}
