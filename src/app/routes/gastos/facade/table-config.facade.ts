import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import {
  ChangeProveedorVisibility,
  ChangeConsorcioVisibility,
  ChangeServicioVisibility,
} from 'redux/gastos/page/page.actions';

@Injectable()
export class TableConfigFacade {
  constructor(private store: Store<AppState>) {}

  proveedorVisibility(visible: boolean) {
    this.store.dispatch(new ChangeProveedorVisibility({ visible }));
  }

  consorcioVisibility(visible: boolean) {
    this.store.dispatch(new ChangeConsorcioVisibility({ visible }));
  }

  servicioVisibility(visible: boolean) {
    this.store.dispatch(new ChangeServicioVisibility({ visible }));
  }
}
